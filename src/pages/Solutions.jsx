import CTASection from "../components/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import Seo from "../components/Seo.jsx";
import { INDUSTRIES } from "../data.js";

export default function Solutions() {
  return (
    <main className="page">
      <Seo
        title="Solutions | GeM Tenders & Government Procurement"
        description="NSIS Techno Solutions currently concentrates on GeM tenders and government procurement across India. Other institutional and industry support is taken up as future requirements arise."
      />
      <PageHero
        kicker="Solutions"
        title="GeM tenders and government procurement."
        lede="All services are offered Pan India. Current work is concentrated on Government e-Marketplace (GeM) tenders. Support is provided only where NSIS is eligible and the applicable bid and contract conditions allow."
      />

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Government & institutional solutions</p>
          <h2>Structured support for public and institutional requirements</h2>
        </div>
        <div className="value-grid">
          <article>
            <h3>GeM tenders</h3>
            <p>
              Current concentration: GeM bid review, documentation, quotation and coordinated supply
              for eligible government and institutional requirements.
            </p>
          </article>
          <article>
            <h3>Government procurement</h3>
            <p>
              Structured sourcing and supply support for government customers, subject to applicable
              procurement and contract conditions.
            </p>
          </article>
          <article>
            <h3>Defence-related opportunities</h3>
            <p>
              Support for defence-related procurement opportunities, subject to applicable bid and
              contract conditions.
            </p>
          </article>
          <article>
            <h3>Educational institutions</h3>
            <p>Supply, IT, furniture and works support for educational and training establishments.</p>
          </article>
          <article>
            <h3>Offices & operational establishments</h3>
            <p>
              A coordinated interface for offices and operational sites that need products, maintenance
              or engineering support.
            </p>
          </article>
        </div>
        <p className="note">
          All government and defence-related work is undertaken only where NSIS is eligible and the
          applicable tender, bid and contract conditions allow.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Industries</p>
          <h2>Where the same desk can be useful</h2>
        </div>
        <div className="card-grid four">
          {INDUSTRIES.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection title="Tell us the customer type, location and specification." />
    </main>
  );
}
