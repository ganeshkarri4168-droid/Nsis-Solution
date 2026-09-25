import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";

export default function Approach() {
  return (
    <main className="page">
      <PageHero
        kicker="06 — Delivery approach"
        title="From requirement to completion — a disciplined workflow."
        lede="A specification-driven path for procurement and project requirements, with documentation and timelines kept in view."
      />

      <ol className="process-list">
        <li>
          <strong>01 Understand</strong>
          <span>Review specifications, quantity, location, timelines and expected outcome.</span>
        </li>
        <li>
          <strong>02 Identify</strong>
          <span>Evaluate suitable products, service resources, technical options and supporting documentation.</span>
        </li>
        <li>
          <strong>03 Propose</strong>
          <span>Submit commercial offer, scope, technical details and applicable terms.</span>
        </li>
        <li>
          <strong>04 Coordinate</strong>
          <span>Plan sourcing, logistics, installation, service activity or project execution as applicable.</span>
        </li>
        <li>
          <strong>05 Deliver</strong>
          <span>Supply or execute according to the agreed scope, documentation and timelines.</span>
        </li>
        <li>
          <strong>06 Support</strong>
          <span>Coordinate agreed post-supply, post-installation or service support.</span>
        </li>
      </ol>

      <section className="section">
        <h2>Customer segments</h2>
        <ul className="ticks light">
          <li>Government and defence-related procurement opportunities, subject to applicable bid and contract conditions.</li>
          <li>Institutions, offices and educational or operational establishments.</li>
          <li>Commercial and industrial customers requiring products, maintenance or engineering support.</li>
          <li>Project-based requirements combining multiple supply and service categories.</li>
        </ul>
      </section>

      <CtaBand title="Start with the requirement. We will take it through to completion." />
    </main>
  );
}
