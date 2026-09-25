import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";

export default function Principles() {
  return (
    <main className="page">
      <PageHero
        kicker="03 — Purpose & principles"
        title="Mission, vision and values that keep every mandate honest."
        lede="NSIS works to a simple standard: understand the requirement, stay clear in documents, and execute what was agreed."
      />

      <div className="value-grid">
        <article>
          <h3>Mission</h3>
          <p>
            To provide dependable procurement, engineering and project-support solutions that respond
            to customer requirements with professionalism, transparency and practical execution.
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

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Values</p>
          <h2>Quality · Reliability · Innovation · Partnership</h2>
        </div>
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
        <ul className="ticks light">
          <li>Understand the requirement before proposing a solution.</li>
          <li>Maintain clarity in technical, commercial and documentation matters.</li>
          <li>Use responsible representations supported by available records.</li>
          <li>Coordinate supply, service or execution with attention to timelines and scope.</li>
          <li>Build long-term relationships through dependable support.</li>
        </ul>
      </section>

      <CtaBand title="If the brief is clear, the offer will be too." />
    </main>
  );
}
