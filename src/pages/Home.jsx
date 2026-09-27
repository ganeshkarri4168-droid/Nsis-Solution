import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import CTASection from "../components/CTASection.jsx";
import Hero from "../components/Hero.jsx";
import LeadershipSection from "../components/LeadershipSection.jsx";
import ProcessTimeline from "../components/ProcessTimeline.jsx";
import Seo from "../components/Seo.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { INDUSTRIES, SERVICES } from "../data.js";

const staticFeatured = SERVICES.flatMap((group) => group.items).slice(0, 6);

const HOME_WHY = [
  { title: "Multi-Domain Capability", text: "A broad portfolio combining procurement, technology, supplies, engineering, maintenance and project support." },
  { title: "Single-Point Coordination", text: "One business interface for requirement review, sourcing, quotation, execution coordination and support." },
  { title: "Professional Documentation", text: "Technical and commercial submissions structured around the stated requirement and available supporting documents." },
  { title: "Responsible Representation", text: "OEM authorization, certifications, experience and brand relationships are stated only when supported and applicable." },
  { title: "Service-Led Approach", text: "Leadership’s Indian Air Force service background reinforces discipline, responsiveness, responsibility and professional conduct." },
  { title: "Responsive Communication", text: "Clear, timely coordination from enquiry through completion, with attention to timelines and agreed scope." },
];

export default function Home() {
  const [featured, setFeatured] = useState(staticFeatured);

  useEffect(() => {
    api("/api/services")
      .then((rows) => {
        const fromAdmin = rows.filter((item) => Number(item.featured));
        const next = fromAdmin.length ? fromAdmin : rows.slice(0, 6);
        if (next.length) setFeatured(next);
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      <Seo
        title="NSIS Techno Solutions | Procurement, Engineering & Project Support"
        description="NSIS Techno Solutions — Pan-India procurement, engineering and project-support solutions for government, institutional, commercial and industrial requirements."
      />
      <Hero />

      <section className="values-strip">
        <p>Quality</p>
        <p>Reliability</p>
        <p>Innovation</p>
        <p>Partnership</p>
      </section>

      <section className="work-strip" aria-label="Work areas">
        {[
          ["/slides/procurement.jpg", "Procurement"],
          ["/slides/project.jpg", "Documentation"],
          ["/slides/it.jpg", "IT"],
          ["/slides/civil.jpg", "Civil"],
          ["/slides/electrical.jpg", "Electrical"],
          ["/slides/infrastructure.jpg", "Projects"],
        ].map(([src, label]) => (
          <article key={label}>
            <img src={src} alt="" />
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">01 — Executive snapshot</p>
          <h2>NSIS at a glance</h2>
        </div>
        <div className="value-grid">
          <article>
            <h3>Who we are</h3>
            <p>
              A proprietorship business serving customers Pan India, focused on integrated
              procurement, engineering and project-support solutions.
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
        <p className="lede" style={{ marginTop: "1.2rem" }}>
          Professional documentation, responsible representation, responsive communication and
          disciplined coordination from enquiry through completion.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Capabilities</p>
          <h2>Key service categories</h2>
        </div>
        <div className="card-grid">
          {featured.map((item) => (
            <ServiceCard item={item} key={item.id || item.title} />
          ))}
        </div>
        <div className="center">
          <Link className="text-link" to="/services">
            Explore all services →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Why choose NSIS</p>
          <h2>A coordinated desk, not a claim list.</h2>
        </div>
        <div className="card-grid">
          {HOME_WHY.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">How we work</p>
          <h2>From requirement to completion</h2>
        </div>
        <ProcessTimeline />
      </section>

      <section className="section">
        <LeadershipSection />
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Customer segments</p>
          <h2>Who we support</h2>
        </div>
        <div className="card-grid four">
          {INDUSTRIES.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                {item.title === "Government"
                  ? "Structured sourcing and supply support for government customers, subject to applicable procurement and contract conditions."
                  : item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        kicker="Let’s discuss your requirement"
        title="Solutions today for a better tomorrow."
      />
    </main>
  );
}
