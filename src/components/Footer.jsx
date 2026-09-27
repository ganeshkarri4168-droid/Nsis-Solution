import { Link } from "react-router-dom";
import { COMPANY } from "../data.js";
import { useSiteSettings } from "../SiteSettings.jsx";
import Icon from "./Icon.jsx";

function FooterLink({ to, href, children }) {
  const content = (
    <>
      <Icon name="arrow" className="icon footer-arrow" />
      <span>{children}</span>
    </>
  );
  if (href) {
    return (
      <a className="footer-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {content}
      </a>
    );
  }
  return (
    <Link className="footer-link" to={to}>
      {content}
    </Link>
  );
}

export default function Footer() {
  const { whatsapp, whatsappDisplay } = useSiteSettings();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <p className="brand-mini">{COMPANY.legalName}</p>
          <p>{COMPANY.tagline}</p>
          <p>{COMPANY.description}</p>
        </div>
        <div>
          <h2>Quick Links</h2>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/leadership">Leadership</FooterLink>
          <FooterLink to="/how-we-work">How We Work</FooterLink>
          <FooterLink to="/why-nsis">Why NSIS</FooterLink>
          <FooterLink to="/contact">Request a Quote</FooterLink>
        </div>
        <div>
          <h2>Services</h2>
          <FooterLink to="/services">Procurement &amp; Technology</FooterLink>
          <FooterLink to="/services">Engineering &amp; Infrastructure</FooterLink>
          <FooterLink to="/solutions">Government &amp; Institutional</FooterLink>
          <FooterLink to="/solutions">Industries</FooterLink>
        </div>
        <div>
          <h2>Contact Information</h2>
          {COMPANY.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <FooterLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</FooterLink>
          <FooterLink href={`tel:${COMPANY.phoneTel[0]}`}>{COMPANY.phones[0]}</FooterLink>
          <FooterLink href={`https://wa.me/${whatsapp}`}>WhatsApp {whatsappDisplay}</FooterLink>
        </div>
      </div>
      <div className="copyright-row">
        <button
          type="button"
          className="back-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Icon name="arrowUp" />
        </button>
        <p className="copyright">
          Solutions today for a better tomorrow · Quality • Reliability • Innovation • Partnership
          <br />© 2026 NSIS Techno Solutions. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
