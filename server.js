import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { openDb } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3001;
const db = openDb(__dirname);
const tokens = new Map();

const app = express();
app.use(cors());
app.use(express.json({ limit: "8mb" }));

const uploadsDir = path.join(__dirname, "data", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

function safeImageUrl(value) {
  const url = String(value || "").trim();
  return url.startsWith("/uploads/") ? url : "";
}

function nowIso() {
  return new Date().toISOString();
}

function jsonSafe(value) {
  if (typeof value === "bigint") return Number(value);
  if (Array.isArray(value)) return value.map(jsonSafe);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, jsonSafe(item)]));
  }
  return value;
}

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizeWhatsApp(value) {
  let digits = digitsOnly(value);
  if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
}

function displayWhatsApp(value) {
  const digits = digitsOnly(value);
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return digits ? `+${digits}` : "";
}

function readSettings() {
  try {
    const rows = db.prepare("SELECT key, value FROM settings").all();
    const map = Object.fromEntries(rows.map((row) => [row.key, row.value]));
    const whatsapp = normalizeWhatsApp(map.whatsapp || "916394180625");
    return { whatsapp, whatsappDisplay: displayWhatsApp(whatsapp) };
  } catch {
    return { whatsapp: "916394180625", whatsappDisplay: "+91 63941 80625" };
  }
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !tokens.has(token)) {
    res.status(401).json({ error: "Please sign in as admin" });
    return;
  }
  next();
}

app.get("/api/settings", (_req, res) => {
  res.json(readSettings());
});

app.get("/api/services", (_req, res) => {
  const rows = db.prepare("SELECT * FROM services ORDER BY featured DESC, id ASC").all();
  res.json(jsonSafe(rows));
});

app.get("/api/announcements", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM announcements ORDER BY datetime(created_at) DESC, id DESC")
    .all();
  res.json(jsonSafe(rows));
});

app.post("/api/inquiries", (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const phone = String(req.body?.phone || "").trim();
  const company = String(req.body?.company || "").trim();
  const requirement = String(req.body?.requirement || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !phone || !requirement || !message) {
    res.status(400).json({ error: "Name, email, phone, requirement, and message are required" });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Please enter a valid email address" });
    return;
  }

  const result = db
    .prepare(
      "INSERT INTO inquiries (name, email, phone, company, requirement, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(name, email, phone, company, requirement, message, nowIso());

  res.status(201).json({ ok: true, id: Number(result.lastInsertRowid) });
});

app.post("/api/admin/login", (req, res) => {
  const username = String(req.body?.username || "").trim();
  const password = String(req.body?.password || "");
  const admin = db
    .prepare("SELECT * FROM admin WHERE username = ? AND password = ?")
    .get(username, password);

  if (!admin) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const token = crypto.randomBytes(24).toString("hex");
  tokens.set(token, admin.username);
  res.json({ token, username: admin.username });
});

app.get("/api/admin/stats", requireAdmin, (_req, res) => {
  const services = db.prepare("SELECT COUNT(*) AS c FROM services").get().c;
  const inquiries = db.prepare("SELECT COUNT(*) AS c FROM inquiries").get().c;
  const announcements = db.prepare("SELECT COUNT(*) AS c FROM announcements").get().c;
  res.json({
    services: Number(services),
    inquiries: Number(inquiries),
    announcements: Number(announcements),
  });
});

app.get("/api/admin/inquiries", requireAdmin, (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM inquiries ORDER BY datetime(created_at) DESC, id DESC")
    .all();
  res.json(jsonSafe(rows));
});

app.post("/api/admin/upload", requireAdmin, (req, res) => {
  const dataUrl = String(req.body?.image || "");
  const match = dataUrl.match(/^data:image\/(jpeg|jpg|png|webp|gif);base64,(.+)$/i);
  if (!match) {
    res.status(400).json({ error: "Please choose a JPG, PNG, WebP or GIF image" });
    return;
  }
  const ext = match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length || buffer.length > 6 * 1024 * 1024) {
    res.status(400).json({ error: "Image must be under 6MB" });
    return;
  }
  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  fs.writeFileSync(path.join(uploadsDir, name), buffer);
  res.json({ url: `/uploads/${name}` });
});

app.post("/api/admin/services", requireAdmin, (req, res) => {
  const title = String(req.body?.title || "").trim();
  const description = String(req.body?.description || "").trim();
  const label = String(req.body?.label || "").trim();
  const featured = req.body?.featured ? 1 : 0;
  const image = safeImageUrl(req.body?.image);

  if (!title || !description || !label) {
    res.status(400).json({ error: "Title, label, and description are required" });
    return;
  }

  const result = db
    .prepare(
      "INSERT INTO services (title, description, label, featured, image) VALUES (?, ?, ?, ?, ?)"
    )
    .run(title, description, label, featured, image);
  res.status(201).json({ id: Number(result.lastInsertRowid) });
});

app.put("/api/admin/services/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const title = String(req.body?.title || "").trim();
  const description = String(req.body?.description || "").trim();
  const label = String(req.body?.label || "").trim();
  const featured = req.body?.featured ? 1 : 0;
  const image = safeImageUrl(req.body?.image);

  if (!id || !title || !description || !label) {
    res.status(400).json({ error: "All service fields are required" });
    return;
  }

  db.prepare(
    "UPDATE services SET title = ?, description = ?, label = ?, featured = ?, image = ? WHERE id = ?"
  ).run(title, description, label, featured, image, id);
  res.json({ ok: true });
});

app.delete("/api/admin/services/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM services WHERE id = ?").run(Number(req.params.id));
  res.json({ ok: true });
});

app.post("/api/admin/announcements", requireAdmin, (req, res) => {
  const title = String(req.body?.title || "").trim();
  const body = String(req.body?.body || "").trim();
  if (!title || !body) {
    res.status(400).json({ error: "Title and body are required" });
    return;
  }
  const result = db
    .prepare("INSERT INTO announcements (title, body, created_at) VALUES (?, ?, ?)")
    .run(title, body, nowIso());
  res.status(201).json({ id: Number(result.lastInsertRowid) });
});

app.put("/api/admin/announcements/:id", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const title = String(req.body?.title || "").trim();
  const body = String(req.body?.body || "").trim();
  if (!id || !title || !body) {
    res.status(400).json({ error: "Title and body are required" });
    return;
  }
  db.prepare("UPDATE announcements SET title = ?, body = ? WHERE id = ?").run(title, body, id);
  res.json({ ok: true });
});

app.delete("/api/admin/announcements/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM announcements WHERE id = ?").run(Number(req.params.id));
  res.json({ ok: true });
});

app.put("/api/admin/settings", requireAdmin, (req, res) => {
  const whatsapp = normalizeWhatsApp(req.body?.whatsapp);
  if (whatsapp.length < 10 || whatsapp.length > 15) {
    res.status(400).json({ error: "Enter a valid WhatsApp number with country code" });
    return;
  }
  db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run("whatsapp", whatsapp);
  res.json(readSettings());
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

const distDir = path.join(__dirname, "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

const server = app.listen(PORT, () => {
  console.log(`NSIS Techno Solutions API running on http://127.0.0.1:${PORT}`);
});
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the other Node process or set PORT to a free port.`
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
