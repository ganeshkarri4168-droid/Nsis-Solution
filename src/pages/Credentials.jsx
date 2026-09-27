import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";

export default function Credentials() {
  return (
    <main className="page">
      <PageHero
        kicker="07 — Credentials & differentiators"
        title="Professional, documented and responsible."
        lede="Client logos, OEM marks and testimonials are added only when documentary support is available."
      />

      <div className="value-grid">
        <article>
          <h3>Documentation first</h3>
          <p>Technical and commercial submissions are structured around the stated requirement and available supporting documents.</p>
        </article>
        <article>
          <h3>Documentation focus</h3>
          <p>Technical and commercial submissions structured around the stated requirement and available supporting documents.</p>
        </article>
        <article>
          <h3>Multi-domain capability</h3>
          <p>A broad portfolio combining procurement, technology, supplies, engineering, maintenance and project support.</p>
        </article>
        <article>
          <h3>Responsible representation</h3>
          <p>OEM authorization, certifications, experience and brand relationships are stated only when supported and applicable.</p>
        </article>
        <article>
          <h3>Single-point coordination</h3>
          <p>One business interface for requirement review, sourcing, quotation, execution coordination and support.</p>
        </article>
        <article>
          <h3>Service-led approach</h3>
          <p>The leadership’s service background reinforces discipline, responsiveness, responsibility and professional conduct.</p>
        </article>
      </div>

      <section className="section panel dusk note">
        <h3>Profile evidence policy</h3>
        <p>
          Client logos, OEM partner logos, project values, certifications, testimonials and performance
          records should be added only when documentary support is available and disclosure is
          appropriate. This keeps the profile credible for procurement, institutional and commercial
          review.
        </p>
      </section>

      <CtaBand title="Ask for the documents that belong with your RFQ." />
    </main>
  );
}
