import fs from "fs";
import path from "path";
import { DatabaseSync } from "node:sqlite";

const SEED_SERVICES = [
  {
    title: "Government Procurement",
    label: "Procurement",
    featured: 1,
    description:
      "Support for structured sourcing and supply requirements for government and institutional customers, subject to applicable procurement and contract conditions.",
  },
  {
    title: "IT Solutions",
    label: "Technology",
    featured: 1,
    description:
      "Desktops, laptops, servers, peripherals and allied IT requirements for offices, institutions and operational establishments.",
  },
  {
    title: "Networking & CCTV",
    label: "Technology",
    featured: 1,
    description:
      "Network infrastructure, CCTV, surveillance and access-control related solutions with specification-driven supply and coordination.",
  },
  {
    title: "Office Automation",
    label: "Technology",
    featured: 0,
    description:
      "Printers, MFDs, scanners, biometric systems and allied office technology, including consumables and support coordination.",
  },
  {
    title: "Stationery & Office Supplies",
    label: "Supplies",
    featured: 0,
    description:
      "General and customized stationery, files and folders, consumables and day-to-day office essentials for institutions and workplaces.",
  },
  {
    title: "Printing Solutions",
    label: "Supplies",
    featured: 0,
    description:
      "Printing equipment, consumables and printing-related supply or service requirements based on the stated specification.",
  },
  {
    title: "Industrial Supplies",
    label: "Supplies",
    featured: 0,
    description:
      "Tools, equipment, consumables and general industrial-use materials sourced to customer specifications.",
  },
  {
    title: "Medical & Laboratory Equipment",
    label: "Supplies",
    featured: 0,
    description:
      "Supply and support coordination for suitable medical, laboratory, test and measurement requirements.",
  },
  {
    title: "Civil Works",
    label: "Engineering",
    featured: 1,
    description:
      "Minor civil works, repairs, renovation and requirement-based infrastructure support for institutional and commercial sites.",
  },
  {
    title: "Electrical Works",
    label: "Engineering",
    featured: 1,
    description:
      "Electrical installation, wiring, lighting, panels, repair and maintenance-related requirements.",
  },
  {
    title: "Mechanical Works",
    label: "Engineering",
    featured: 0,
    description:
      "Equipment maintenance, repair, overhauling and allied mechanical support requirements.",
  },
  {
    title: "Infrastructure Solutions",
    label: "Projects",
    featured: 1,
    description:
      "Coordinated supply and project support for institutional and workplace infrastructure.",
  },
  {
    title: "Furniture",
    label: "Projects",
    featured: 0,
    description:
      "Office and institutional furniture supply, with support for customized requirement briefs.",
  },
  {
    title: "Interior Services",
    label: "Projects",
    featured: 0,
    description:
      "Interior improvement, furnishing and requirement-based workspace solutions.",
  },
  {
    title: "AMC Services",
    label: "Services",
    featured: 0,
    description:
      "Annual maintenance and preventive or corrective support for eligible equipment and systems.",
  },
  {
    title: "Facility Management",
    label: "Services",
    featured: 0,
    description:
      "Coordinated maintenance and operational support services according to a defined scope.",
  },
];

const SEED_ANNOUNCEMENTS = [
  {
    title: "Ready for RFQs and specification-driven enquiries",
    body: "NSIS Techno Solutions supports government, institutional and commercial customers from requirement review through quotation, sourcing, delivery or execution, and agreed post-delivery support.",
  },
  {
    title: "GST and Udyam credentials for formal engagement",
    body: "GSTIN 37EJJPS0809D1Z5 and UDYAM-AP-10-0125033 are available for procurement desks that need documented, statutory business communication.",
  },
  {
    title: "Led with Indian Air Force service discipline",
    body: "Proprietor Shaik Noor Mohammed brings 20+ years of IAF service experience to structured execution, documentation, timely coordination and dependable customer support.",
  },
];

const ADMIN_USER = "admin";
const ADMIN_PASS = "nsis2026";

export function seedDatabase(db) {
  db.exec("DELETE FROM services; DELETE FROM announcements; DELETE FROM admin;");
  db.prepare("INSERT INTO admin (username, password) VALUES (?, ?)").run(ADMIN_USER, ADMIN_PASS);

  const insertService = db.prepare(
    "INSERT INTO services (title, description, label, featured) VALUES (?, ?, ?, ?)"
  );
  for (const service of SEED_SERVICES) {
    insertService.run(service.title, service.description, service.label, service.featured);
  }

  const insertNews = db.prepare(
    "INSERT INTO announcements (title, body, created_at) VALUES (?, ?, ?)"
  );
  const now = new Date();
  SEED_ANNOUNCEMENTS.forEach((item, index) => {
    insertNews.run(item.title, item.body, new Date(now.getTime() - index * 86400000).toISOString());
  });
}

export function openDb(rootDir) {
  const dataDir = path.join(rootDir, "data");
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new DatabaseSync(path.join(dataDir, "site.db"));

  db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      label TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      image TEXT
    );
    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      requirement TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  for (const column of ["company TEXT", "requirement TEXT"]) {
    try {
      db.exec(`ALTER TABLE inquiries ADD COLUMN ${column}`);
    } catch {
      /* column already exists */
    }
  }

  try {
    db.exec("ALTER TABLE services ADD COLUMN image TEXT");
  } catch {
    /* column already exists */
  }

  const whatsapp = db.prepare("SELECT value FROM settings WHERE key = ?").get("whatsapp");
  if (!whatsapp) {
    db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run("whatsapp", "916394180625");
  } else if (whatsapp.value === "919346671055") {
    db.prepare("UPDATE settings SET value = ? WHERE key = ?").run("916394180625", "whatsapp");
  }

  const first = db.prepare("SELECT title FROM services ORDER BY id ASC LIMIT 1").get();
  if (!first || first.title !== "Government Procurement") {
    seedDatabase(db);
  } else {
    const adminCount = db.prepare("SELECT COUNT(*) AS c FROM admin").get();
    if (!adminCount.c) {
      db.prepare("INSERT INTO admin (username, password) VALUES (?, ?)").run(ADMIN_USER, ADMIN_PASS);
    }
  }

  return db;
}
