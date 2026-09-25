import CapabilityGrid from "../components/CapabilityGrid.jsx";
import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";

export default function Procurement() {
  return (
    <main className="page">
      <PageHero
        kicker="04 — Procurement & technology"
        title="Specification-driven sourcing for government, institutions and commercial desks."
        lede="IT, networking, office automation, stationery, industrial supplies and laboratory equipment — coordinated from one interface."
      />
      <CapabilityGrid labels={["Procurement", "Technology", "Supplies"]} />
      <CtaBand title="Send the specification. We will identify suitable options and a commercial offer." />
    </main>
  );
}
