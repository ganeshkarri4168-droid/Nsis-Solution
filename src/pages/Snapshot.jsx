import { Link } from "react-router-dom";
import CTASection from "../components/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import Seo from "../components/Seo.jsx";

export default function Snapshot() {
  return (
    <main className="page">
      <Seo
        title="NSIS at a Glance | Executive Snapshot"
        description="NSIS Techno Solutions at a glance: a Pan-India proprietorship for integrated procurement, engineering and project-support solutions."
      />
      <PageHero
        kicker="01 — Executive snapshot"
        title="Designed for procurement teams, institutions, business partners and prospective customers."
        lede="A proprietorship business serving customers Pan India, focused on integrated procurement, engineering and project-support solutions."
      />

      <div className="value-grid">
        <article>
          <h3>Who we are</h3>
          <p>
            A proprietorship serving customers Pan India, focused on integrated procurement,
            engineering and project-support solutions.
          </p>
        </article>
        <article>
          <h3>What we support</h3>
          <p>
            Specification-driven requirements across IT, stationery, office automation, industrial
            supplies, infrastructure, engineering works, maintenance and allied categories.
          </p>
        </article>
        <article>
          <h3>How we work</h3>
          <p>
            Requirement review, solution identification, quotation, sourcing, coordination, supply or
            execution, and agreed post-delivery support.
          </p>
        </article>
      </div>

      <section className="section">
        <h2>Our business ethos</h2>
        <p className="lede">
          Professional documentation, responsible representation, responsive communication and
          disciplined coordination from enquiry through completion.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-navy" to="/leadership">
            Meet leadership
          </Link>
          <Link className="btn btn-ghost dark" to="/about">
            Read principles
          </Link>
        </div>
      </section>

      <CTASection title="Let’s discuss your requirement." />
    </main>
  );
}
