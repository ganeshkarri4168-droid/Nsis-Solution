const NAMES = [
  "Procurement",
  "Quality",
  "IT Solutions",
  "Reliability",
  "Civil Works",
  "Innovation",
  "Electrical",
  "Partnership",
  "Projects",
  "GeM Tenders",
  "Documentation",
  "Pan India",
];

export default function FooterStrip() {
  const loop = [...NAMES, ...NAMES];

  return (
    <section className="scroll-strip" aria-label="Work areas">
      <div className="scroll-strip-fade">
        <div className="scroll-strip-track">
          {loop.map((name, index) => (
            <span className="scroll-chip" key={`${name}-${index}`}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
