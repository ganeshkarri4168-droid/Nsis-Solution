import ContactForm from "../components/ContactForm.jsx";
import Icon from "../components/Icon.jsx";
import Seo from "../components/Seo.jsx";
import { COMPANY } from "../data.js";
import { useSiteSettings } from "../SiteSettings.jsx";

const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapsQuery)}&z=16&output=embed`;

export default function Contact() {
  const { whatsapp, whatsappDisplay } = useSiteSettings();

  return (
    <main className="contact-page">
      <Seo
        title="Contact NSIS Techno Solutions"
        description="Contact NSIS Techno Solutions for Pan-India procurement, engineering or project support. Email nsistechnosolutions@gmail.com."
      />

      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="eyebrow">Contact us</p>
          <h1>Let’s discuss your requirement.</h1>
          <p className="lede">
            RFQs, GeM tender briefs and government procurement enquiries — one coordinated desk
            serving customers Pan India.
          </p>
        </div>
      </section>

      <div className="contact-quick">
        <a className="contact-quick-card" href={`tel:${COMPANY.phoneTel[0]}`}>
          <Icon name="phone" />
          <span className="contact-quick-copy">
            <strong>Call</strong>
            <span>{COMPANY.phones[0]}</span>
          </span>
        </a>
        <a
          className="contact-quick-card whatsapp-card"
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="chat" />
          <span className="contact-quick-copy">
            <strong>WhatsApp</strong>
            <span>{whatsappDisplay}</span>
          </span>
        </a>
        <a className="contact-quick-card" href={`mailto:${COMPANY.email}`}>
          <Icon name="mail" />
          <span className="contact-quick-copy">
            <strong>Email</strong>
            <span>{COMPANY.email}</span>
          </span>
        </a>
      </div>

      <section className="contact-shell">
        <div className="contact-form-wrap">
          <p className="eyebrow">Enquiry</p>
          <h2>Send your requirement</h2>
          <p className="contact-form-lede">
            Include GeM bid or tender reference, specification, quantity, location and timeline. NSIS
            will respond on the email or mobile you provide.
          </p>
          <ContactForm />
        </div>

        <aside className="contact-office">
          <p className="eyebrow">Office</p>
          <h2>Registered office</h2>
          <ul className="contact-meta">
            <li>
              <Icon name="pin" />
              <div>
                {COMPANY.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </li>
            <li>
              <Icon name="mail" />
              <div>
                <p>
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </p>
              </div>
            </li>
            <li>
              <Icon name="phone" />
              <div>
                {COMPANY.phones.map((phone, index) => (
                  <p key={phone}>
                    <a href={`tel:${COMPANY.phoneTel[index]}`}>{phone}</a>
                  </p>
                ))}
              </div>
            </li>
          </ul>
          <div className="contact-creds">
            <p>
              <strong>GSTIN</strong>
              {COMPANY.gstin}
            </p>
            <p>
              <strong>UDYAM</strong>
              {COMPANY.udyam}
            </p>
          </div>
        </aside>
      </section>

      <section className="contact-map">
        <div className="section-head">
          <p className="eyebrow">Location</p>
          <h2>Office on the map</h2>
        </div>
        <div className="contact-map-frame">
          <iframe
            title="NSIS Techno Solutions office map, Madhurawada Visakhapatnam"
            src={mapsSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
