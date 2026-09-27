import CTASection from "../components/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import Seo from "../components/Seo.jsx";
import { WHY } from "../data.js";

export default function WhyNsis() {
  return (
    <main className="page">
      <Seo
        title="Why NSIS | Working Style"
        description="Why organisations work with NSIS Techno Solutions: a GeM-tender desk and a service-led approach. No unverified awards or client claims."
      />
      <PageHero
        kicker="Why NSIS"
        title="Professional, documented and responsible."
        lede="Current work is concentrated on GeM tenders. Differentiators are limited to how we work."
      />

      <div className="card-grid">
        {WHY.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <section className="panel dusk note">
        <h3>Profile evidence policy</h3>
        <p>
          Client logos, OEM partner logos, project values, certifications, testimonials and
          performance records should be added only when documentary support is available and
          disclosure is appropriate.
        </p>
      </section>

      <CTASection title="Ask for the documents that belong with your RFQ." />
    </main>
  );
}
