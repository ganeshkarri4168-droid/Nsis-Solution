import { useState } from "react";
import { api } from "../api.js";

const empty = {
  name: "",
  company: "",
  email: "",
  phone: "",
  requirement: "",
  message: "",
};

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
  return /^[0-9+\-\s]{10,16}$/.test(value.trim());
}

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function validate() {
    if (form.name.trim().length < 2) return "Please enter your name.";
    if (!isEmail(form.email)) return "Please enter a valid email address.";
    if (!isPhone(form.phone)) return "Please enter a valid phone number.";
    if (form.requirement.trim().length < 3) return "Please describe the requirement.";
    if (form.message.trim().length < 10) return "Please add a short message (at least 10 characters).";
    return "";
  }

  async function submit(event) {
    event.preventDefault();
    const problem = validate();
    if (problem) {
      setStatus({ type: "error", text: problem });
      return;
    }
    setSending(true);
    setStatus({ type: "", text: "" });
    try {
      await api("/api/inquiries", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm(empty);
      setStatus({
        type: "ok",
        text: "Thank you. NSIS will respond on the email or mobile you provided.",
      });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <label>
        Name
        <input name="name" value={form.name} onChange={update} required placeholder="Your name" />
      </label>
      <label>
        Company
        <input name="company" value={form.company} onChange={update} placeholder="Organisation (optional)" />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={update} required placeholder="you@email.com" />
      </label>
      <label>
        Phone
        <input name="phone" value={form.phone} onChange={update} required placeholder="+91" />
      </label>
      <label className="full">
        Requirement
        <input
          name="requirement"
          value={form.requirement}
          onChange={update}
          required
          placeholder="IT supply, civil works, CCTV, AMC…"
        />
      </label>
      <label className="full">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          required
          rows="5"
          placeholder="Specification, quantity, location, timeline…"
        />
      </label>
      <div className="contact-form-actions full">
        <button className="btn btn-gold" type="submit" disabled={sending}>
          {sending ? "Sending…" : "Send enquiry"}
        </button>
        {status.text ? <p className={`banner ${status.type}`}>{status.text}</p> : null}
      </div>
    </form>
  );
}
