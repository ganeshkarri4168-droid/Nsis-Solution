import CapabilityGrid from "../components/CapabilityGrid.jsx";
import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";

export default function Engineering() {
  return (
    <main className="page">
      <PageHero
        kicker="05 — Engineering, infrastructure & services"
        title="Works, interiors, AMC and facility support according to defined scope."
        lede="Civil, electrical and mechanical works plus furniture, interiors, infrastructure solutions, annual maintenance and facility management."
      />
      <CapabilityGrid labels={["Engineering", "Projects", "Services"]} />
      <CtaBand title="Share location, timeline and expected outcome for a coordinated works plan." />
    </main>
  );
}
