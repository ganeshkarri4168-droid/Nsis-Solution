import ServiceCard from "./ServiceCard.jsx";

export default function ServiceSection({ group, items }) {
  return (
    <section className="section">
      <div className="section-head">
        <p className="eyebrow">Services</p>
        <h2>{group}</h2>
      </div>
      <div className="card-grid">
        {items.map((item) => (
          <ServiceCard item={item} key={item.id || item.title} />
        ))}
      </div>
    </section>
  );
}
