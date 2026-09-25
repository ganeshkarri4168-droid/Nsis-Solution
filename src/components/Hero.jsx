import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-wrap">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">NSIS Techno Solutions · Pan India</p>
          <h1>Integrated Solutions. Reliable Execution.</h1>
          <p className="tagline">Integrated Procurement • Engineering • Project Solutions</p>
          <p className="lede">
            A multi-domain solutions firm supporting procurement, technology, engineering,
            infrastructure, maintenance and operational requirements through a coordinated point of
            engagement — across India.
          </p>
          <p className="ethos">Led with the discipline and service ethos of an IAF Veteran</p>
          <div className="hero-actions">
            <Link className="btn btn-gold" to="/contact">
              Request a Quote
            </Link>
            <Link className="btn btn-ghost" to="/services">
              Explore Services
            </Link>
          </div>
        </div>
        <div className="hero-art hero-logo-card">
          <div className="logo-disc">
            <img src="/nsis-mark.png?v=2" alt="NSIS Techno Solutions logo" />
          </div>
          <p className="hero-logo-name">NSIS Techno Solutions</p>
          <p>Pan India</p>
        </div>
      </div>
    </section>
  );
}
