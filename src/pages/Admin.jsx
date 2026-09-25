import { useEffect, useState } from "react";
import { api, clearToken, hasToken, saveToken } from "../api.js";
import { useSiteSettings } from "../SiteSettings.jsx";

const emptyService = { title: "", label: "", description: "", featured: false, image: "" };
const emptyNews = { title: "", body: "" };

async function uploadImage(file) {
  if (!file) return "";
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read the image"));
    reader.readAsDataURL(file);
  });
  const data = await api("/api/admin/upload", {
    method: "POST",
    body: JSON.stringify({ image: dataUrl }),
  });
  return data.url || "";
}

export default function Admin() {
  const { applySettings } = useSiteSettings();
  const [authed, setAuthed] = useState(hasToken());
  const [login, setLogin] = useState({ username: "admin", password: "" });
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState({ services: 0, inquiries: 0, announcements: 0 });
  const [services, setServices] = useState([]);
  const [news, setNews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [editingId, setEditingId] = useState(null);
  const [newsForm, setNewsForm] = useState(emptyNews);
  const [newsId, setNewsId] = useState(null);
  const [settingsForm, setSettingsForm] = useState({ whatsapp: "" });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function refresh() {
    const [nextStats, nextServices, nextNews, nextInquiries] = await Promise.all([
      api("/api/admin/stats"),
      api("/api/services"),
      api("/api/announcements"),
      api("/api/admin/inquiries"),
    ]);
    setStats(nextStats);
    setServices(nextServices);
    setNews(nextNews);
    setInquiries(nextInquiries);
    try {
      const nextSettings = await api("/api/settings");
      setSettingsForm({ whatsapp: nextSettings.whatsappDisplay || nextSettings.whatsapp || "" });
      applySettings(nextSettings);
    } catch {
      /* WhatsApp settings are optional if the API is still starting */
    }
  }

  useEffect(() => {
    if (!authed) return;
    refresh().catch((err) => {
      const message = err.message || "Request failed";
      if (/sign in/i.test(message)) {
        clearToken();
        setAuthed(false);
      }
      setError(message);
    });
  }, [authed]);

  async function signIn(event) {
    event.preventDefault();
    setError("");
    try {
      const data = await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(login),
      });
      if (!data.token) throw new Error("Could not sign in. Please try again.");
      saveToken(data.token);
      setAuthed(true);
    } catch (err) {
      setError(err.message);
    }
  }

  function signOut() {
    clearToken();
    setAuthed(false);
  }

  async function saveService(event) {
    event.preventDefault();
    setError("");
    setUploading(true);
    try {
      const file = event.target.image?.files?.[0];
      const image = file ? await uploadImage(file) : serviceForm.image || "";
      const payload = {
        ...serviceForm,
        featured: Boolean(serviceForm.featured),
        image,
      };
      if (editingId) {
        await api(`/api/admin/services/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await api("/api/admin/services", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setServiceForm(emptyService);
      setEditingId(null);
      event.target.reset();
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function saveNews(event) {
    event.preventDefault();
    if (newsId) {
      await api(`/api/admin/announcements/${newsId}`, {
        method: "PUT",
        body: JSON.stringify(newsForm),
      });
    } else {
      await api("/api/admin/announcements", {
        method: "POST",
        body: JSON.stringify(newsForm),
      });
    }
    setNewsForm(emptyNews);
    setNewsId(null);
    await refresh();
  }

  async function saveSettings(event) {
    event.preventDefault();
    setError("");
    setSettingsSaved(false);
    try {
      const data = await api("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ whatsapp: settingsForm.whatsapp }),
      });
      setSettingsForm({ whatsapp: data.whatsappDisplay || data.whatsapp });
      applySettings(data);
      setSettingsSaved(true);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!authed) {
    return (
      <main className="page admin-login">
        <form className="panel" onSubmit={signIn}>
          <p className="eyebrow">NSIS desk</p>
          <h1>Sign in to NSIS</h1>
          <label>
            Username
            <input
              value={login.username}
              onChange={(event) => setLogin({ ...login, username: event.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={login.password}
              onChange={(event) => setLogin({ ...login, password: event.target.value })}
              required
            />
          </label>
          <button className="btn btn-gold" type="submit">
            Enter
          </button>
          {error ? <p className="banner error">{error}</p> : null}
          <p className="hint">Default: admin / nsis2026</p>
        </form>
      </main>
    );
  }

  return (
    <main className="page admin">
      <header className="admin-head">
        <div>
          <p className="eyebrow">NSIS desk</p>
          <h1>Capability desk</h1>
        </div>
        <button className="btn btn-ghost dark" type="button" onClick={signOut}>
          Sign out
        </button>
      </header>

      <div className="tabs">
        {["overview", "services", "announcements", "inquiries", "settings"].map((item) => (
          <button
            key={item}
            className={tab === item ? "active" : ""}
            type="button"
            onClick={() => {
              setTab(item);
              setError("");
              setSettingsSaved(false);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <section className="stats admin-stats">
          <article>
            <strong>{stats.services}</strong>
            <span>Services</span>
          </article>
          <article>
            <strong>{stats.announcements}</strong>
            <span>Announcements</span>
          </article>
          <article>
            <strong>{stats.inquiries}</strong>
            <span>Enquiries</span>
          </article>
        </section>
      ) : null}

      {tab === "services" ? (
        <section className="admin-split">
          <form className="panel" onSubmit={saveService}>
            <h3>{editingId ? "Edit service" : "New service"}</h3>
            <label>
              Title
              <input
                value={serviceForm.title}
                onChange={(event) => setServiceForm({ ...serviceForm, title: event.target.value })}
                required
              />
            </label>
            <label>
              Label
              <input
                value={serviceForm.label}
                onChange={(event) => setServiceForm({ ...serviceForm, label: event.target.value })}
                required
                placeholder="Buy · Villas"
              />
            </label>
            <label>
              Description
              <textarea
                rows="4"
                value={serviceForm.description}
                onChange={(event) =>
                  setServiceForm({ ...serviceForm, description: event.target.value })
                }
                required
              />
            </label>
            <label>
              Image
              <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
            </label>
            {serviceForm.image ? (
              <img className="admin-preview" src={serviceForm.image} alt="" />
            ) : null}
            <label className="check">
              <input
                type="checkbox"
                checked={Boolean(serviceForm.featured)}
                onChange={(event) =>
                  setServiceForm({ ...serviceForm, featured: event.target.checked })
                }
              />
              Featured on home
            </label>
            {error ? <p className="banner error">{error}</p> : null}
            <button className="btn btn-gold" type="submit" disabled={uploading}>
              {uploading ? "Saving…" : editingId ? "Update" : "Add service"}
            </button>
          </form>
          <div className="stack">
            {services.map((item) => (
              <article className="row-card" key={item.id}>
                {item.image ? <img className="admin-thumb" src={item.image} alt="" /> : null}
                <div>
                  <p className="chip">{item.label}</p>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="row-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item.id);
                      setServiceForm({
                        title: item.title,
                        label: item.label,
                        description: item.description,
                        featured: Boolean(item.featured),
                        image: item.image || "",
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={async () => {
                      await api(`/api/admin/services/${item.id}`, { method: "DELETE" });
                      await refresh();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {tab === "announcements" ? (
        <section className="admin-split">
          <form className="panel" onSubmit={saveNews}>
            <h3>{newsId ? "Edit note" : "New announcement"}</h3>
            <label>
              Title
              <input
                value={newsForm.title}
                onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })}
                required
              />
            </label>
            <label>
              Body
              <textarea
                rows="4"
                value={newsForm.body}
                onChange={(event) => setNewsForm({ ...newsForm, body: event.target.value })}
                required
              />
            </label>
            <button className="btn btn-gold" type="submit">
              {newsId ? "Update" : "Publish"}
            </button>
          </form>
          <div className="stack">
            {news.map((item) => (
              <article className="row-card" key={item.id}>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
                <div className="row-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setNewsId(item.id);
                      setNewsForm({ title: item.title, body: item.body });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={async () => {
                      await api(`/api/admin/announcements/${item.id}`, { method: "DELETE" });
                      await refresh();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {tab === "inquiries" ? (
        <section className="stack">
          {inquiries.length === 0 ? <p>No enquiries yet.</p> : null}
          {inquiries.map((item) => (
            <article className="row-card" key={item.id}>
              <div>
                <h4>
                  {item.name} · {item.email}
                </h4>
                <p>{item.company || "No company"} · {item.phone || "No phone"}</p>
                {item.requirement ? <p>{item.requirement}</p> : null}
                <p>{item.message}</p>
                <time>{new Date(item.created_at).toLocaleString("en-IN")}</time>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {tab === "settings" ? (
        <section>
          <form className="panel" onSubmit={saveSettings}>
            <h3>WhatsApp number</h3>
            <p className="hint">
              This number is used on the green WhatsApp button, the contact page, and the footer.
            </p>
            <label>
              WhatsApp number
              <input
                value={settingsForm.whatsapp}
                onChange={(event) =>
                  setSettingsForm({ ...settingsForm, whatsapp: event.target.value })
                }
                placeholder="+91 63941 80625"
                required
              />
            </label>
            {error ? <p className="banner error">{error}</p> : null}
            {settingsSaved ? (
              <p className="banner ok">Saved. The website now uses this WhatsApp number.</p>
            ) : null}
            <button className="btn btn-gold" type="submit">
              Save number
            </button>
          </form>
        </section>
      ) : null}
    </main>
  );
}
