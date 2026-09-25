import { Link } from "react-router-dom";

export default function CtaBand({ kicker, title, to = "/contact", action = "Send an RFQ" }) {
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
