import { useEffect, useState } from "react";
import { api } from "../api.js";
import CTASection from "../components/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import Seo from "../components/Seo.jsx";
import ServiceSection from "../components/ServiceSection.jsx";
import { SERVICES } from "../data.js";

function groupServices(rows) {
  const groups = [];
  const map = new Map();
  for (const item of rows) {
    const key = item.label || "Services";
    if (!map.has(key)) {
      const block = { group: key, items: [] };
      map.set(key, block);
      groups.push(block);
    }
    map.get(key).items.push(item);
  }
  return groups;
}

export default function Services() {
  const [blocks, setBlocks] = useState(SERVICES);

  useEffect(() => {
    api("/api/services")
      .then((rows) => {
        if (rows.length) setBlocks(groupServices(rows));
      })
      .catch(() => {});
  }, []);

  return (
    <main className="page">
      <Seo
        title="Services | GeM Tenders & Wider Capabilities"
        description="Current focus: GeM tenders. NSIS Techno Solutions also supports IT, engineering, AMC and allied categories as future requirements arise."
      />
      <PageHero
        kicker="Services"
        title="GeM tenders first. Other capabilities as required."
        lede="All services are offered Pan India. The current desk concentrates on GeM tenders. IT, engineering, infrastructure and allied services are available as future requirements arise."
      />
      {blocks.map((block) => (
        <ServiceSection group={block.group} items={block.items} key={block.group} />
      ))}
      <CTASection title="Enquire on a specific capability or a combined project brief." />
    </main>
  );
}
