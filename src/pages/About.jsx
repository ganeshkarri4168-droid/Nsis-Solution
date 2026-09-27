import { Link } from "react-router-dom";
import LeadershipSection from "../components/LeadershipSection.jsx";
import PageHero from "../components/PageHero.jsx";
import Seo from "../components/Seo.jsx";
import { COMPANY } from "../data.js";

export default function About() {
  return (
    <main className="page">
      <Seo
        title="About NSIS Techno Solutions"
        description="NSIS Techno Solutions is a Pan-India proprietorship currently concentrated on GeM tenders and government procurement, led by IAF Veteran Shaik Noor Mohammed."
      />
      <PageHero
        kicker="About us"
        title="Who we are"
        lede="A proprietorship serving customers Pan India. Current work is concentrated on GeM tenders; further services follow as requirements arise."
      />

      <section className="section">
        <h2>Company overview</h2>
        <p className="lede">{COMPANY.description}</p>
        <p>
          NSIS Techno Solutions is positioned to support government and institutional customers.
          The current concentration is GeM (Government e-Marketplace) tenders and related
          procurement. The wider portfolio — IT, infrastructure, civil, electrical and mechanical
          works, supplies, automation and maintenance — is taken up as future requirements arise.
        </p>
      </section>

      <LeadershipSection />

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Purpose</p>
          <h2>Mission and vision</h2>
        </div>
        <div className="value-grid">
          <article>
            <h3>Mission</h3>
            <p>
              To provide dependable GeM-tender and government-procurement support, with additional
              capabilities taken up as customer requirements arise.
            </p>
          </article>
          <article>
            <h3>Vision</h3>
            <p>
              To develop NSIS Techno Solutions into a trusted multi-domain solutions partner for
              government, institutional and commercial customers.
            </p>
          </article>
          <article>
            <h3>Business ethos</h3>
            <p>
              Professional documentation, responsible representation, responsive communication and
              disciplined coordination from enquiry through completion.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>Core values</h2>
        <div className="value-grid four">
          <article>
            <h3>Quality</h3>
            <p>Focus on requirement conformity, suitable products or services and clear deliverables.</p>
          </article>
          <article>
            <h3>Reliability</h3>
            <p>Responsive communication, coordinated execution and dependable support.</p>
          </article>
          <article>
            <h3>Innovation</h3>
            <p>Practical adoption of technology and solution-oriented approaches.</p>
          </article>
          <article>
            <h3>Partnership</h3>
            <p>Long-term relationships built through professional and transparent engagement.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>Working principles</h2>
        <ul className="ticks">
          <li>Understand the requirement before proposing a solution.</li>
          <li>Maintain clarity in technical, commercial and documentation matters.</li>
          <li>Use responsible representations supported by available records.</li>
          <li>Coordinate supply, service or execution with attention to timelines and scope.</li>
          <li>Build long-term relationships through dependable support.</li>
        </ul>
      </section>

      <section className="about-cta">
        <div className="about-cta-copy">
          <p className="eyebrow">Get in touch</p>
          <h2>Ask for the documents that belong with your RFQ.</h2>
          <p>
            Share the specification, quantity, location and timeline. The desk will respond on the
            email or mobile you provide.
          </p>
        </div>
        <Link className="btn btn-gold" to="/contact">
          Ask for the documents
        </Link>
      </section>
    </main>
  );
}
