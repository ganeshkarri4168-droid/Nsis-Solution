import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function CapabilityGrid({ labels }) {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/services")
      .then(setServices)
      .catch((err) => setError(err.message));
  }, []);

  const items = labels
    ? services.filter((item) => labels.includes(item.label))
    : services;

  const groups = items.reduce((acc, item) => {
    const key = item.label || "Solutions";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  if (error) return <p className="banner error">{error}</p>;
  if (!services.length) return <p>Loading capabilities…</p>;

  return Object.entries(groups).map(([group, rows]) => (
    <section className="section" key={group}>
      <h2>{group}</h2>
      <div className="card-grid">
        {rows.map((item) => (
          <article className="card tall" key={item.id}>
            {item.image ? (
              <img className="card-image" src={item.image} alt={item.title} />
            ) : null}
            <p className="chip">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.featured ? <span className="ribbon">Featured</span> : null}
            <Link className="text-link" to="/contact">
              Enquire on this capability →
            </Link>
          </article>
        ))}
      </div>
    </section>
  ));
}
