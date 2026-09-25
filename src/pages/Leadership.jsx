import { Link } from "react-router-dom";
import CTASection from "../components/CTASection.jsx";
import Icon from "../components/Icon.jsx";
import Seo from "../components/Seo.jsx";
import { COMPANY, LEADER_EXPERIENCE } from "../data.js";

export default function Leadership() {
  return (
    <main className="profile-page">
      <Seo
        title="Leadership | Shaik Noor Mohammed"
        description="Meet Shaik Noor Mohammed, IAF Veteran and proprietor of NSIS Techno Solutions — 20+ years of service experience applied to procurement, engineering and project support across India."
      />

      <section className="profile-hero">
        <div className="profile-hero-inner">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              <img src="/nsis-mark.png?v=2" alt="" />
              <span>{COMPANY.leaderInitials}</span>
            </div>
            <span className="profile-badge">
              <Icon name="shield" />
              IAF
            </span>
          </div>
          <p className="eyebrow">Leadership</p>
          <h1>{COMPANY.leader}</h1>
          <p className="tagline">{COMPANY.leaderRole}</p>
          <p className="lede">{COMPANY.leaderYears} · Proprietor, NSIS Techno Solutions</p>
        </div>
      </section>

      <section className="profile-stats">
        <article>
          <strong>20+</strong>
          <span>Years of IAF service experience</span>
        </article>
        <article>
          <strong>IAF</strong>
          <span>IAF Veteran</span>
        </article>
        <article>
          <strong>NSIS</strong>
          <span>Proprietor · Pan India</span>
        </article>
      </section>

      <section className="section profile-story">
        <article className="profile-portrait">
          <div className="profile-portrait-frame">
            <strong>{COMPANY.leaderInitials}</strong>
          </div>
          <p className="chip">Proprietor</p>
          <h2>{COMPANY.leader}</h2>
          <p>{COMPANY.leaderRole}</p>
        </article>
        <div>
          <p className="eyebrow">Experience</p>
          <h2>Service background, applied to a working desk.</h2>
          <p>
            Bringing more than 20 years of service experience in the Indian Air Force, Shaik Noor
            Mohammed contributes a professional approach founded on discipline, responsibility,
            integrity and commitment to quality.
          </p>
          <p>
            That background supports NSIS Techno Solutions’ emphasis on structured execution, timely
            coordination, documentation and dependable customer support — from requirement review
            through quotation, supply or execution, and agreed post-delivery support.
          </p>
          <p>
            He leads a proprietorship desk for government, institutional and commercial customers
            across India — procurement, technology, engineering and project-related work.
          </p>
          <Link className="btn btn-navy" to="/contact">
            Speak with the desk
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Service record in practice</p>
          <h2>How that experience shows up in the work.</h2>
        </div>
        <div className="card-grid profile-experience">
          {LEADER_EXPERIENCE.map((item) => (
            <article className="card" key={item.no}>
              <p className="chip">{item.no}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <aside className="panel dusk profile-note">
          <h3>Business positioning</h3>
          <p>
            One coordinated point of engagement for diverse operational requirements — understanding
            the specification, identifying appropriate solutions, maintaining clear communication and
            supporting delivery or execution according to the agreed scope.
          </p>
        </aside>
      </section>

      <CTASection title="Start a conversation with the NSIS desk." />
    </main>
  );
}
