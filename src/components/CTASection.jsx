import { Link } from "react-router-dom";

export default function CTASection({ kicker, title, action = "Request a Quote", to = "/contact" }) {
  return (
    <section className="cta-band">
      <div>
        {kicker ? <p className="eyebrow">{kicker}</p> : null}
        <h2>{title}</h2>
      </div>
      <Link className="btn btn-gold" to={to}>
        {action}
      </Link>
    </section>
  );
}
