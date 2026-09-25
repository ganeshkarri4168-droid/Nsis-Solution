import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function ServiceCard({ item }) {
  return (
    <article className="card tall">
      {item.image ? (
        <img className="card-image" src={item.image} alt={item.title} />
      ) : (
        <Icon name={item.icon} />
      )}
      {item.label ? <p className="chip">{item.label}</p> : null}
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <Link className="btn btn-light" to="/contact">
        Enquire Now
      </Link>
    </article>
  );
}
