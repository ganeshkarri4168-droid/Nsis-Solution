import { COMPANY } from "../data.js";
import { useSiteSettings } from "../SiteSettings.jsx";

export default function FloatActions() {
  const { whatsapp } = useSiteSettings();

  return (
    <div className="float-actions">
      <a href={`tel:${COMPANY.phoneTel[0]}`}>Call Now</a>
      <a
        className="whatsapp-btn"
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <a href={`mailto:${COMPANY.email}`}>Email Us</a>
    </div>
  );
}
