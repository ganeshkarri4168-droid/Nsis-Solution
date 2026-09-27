import { Link } from "react-router-dom";
import { COMPANY } from "../data.js";

export default function LeadershipSection() {
  return (
    <section className="leader">
      <div>
        <p className="eyebrow">Leadership</p>
        <div className="leader-intro">
          <div className="profile-avatar profile-avatar-photo leader-avatar">
            <img src="/nsis-profile.jpg?v=suit" alt={COMPANY.leader} />
          </div>
          <div>
            <h2>{COMPANY.leader}</h2>
            <p className="tagline">
              {COMPANY.leaderRole} · {COMPANY.leaderYears}
            </p>
          </div>
        </div>
        <p>
          Bringing more than 20 years of service experience in the Indian Air Force, Shaik Noor
          Mohammed contributes a professional approach founded on discipline, responsibility,
          integrity and commitment to quality. This background supports NSIS Techno Solutions’
          emphasis on structured execution, timely coordination, documentation and dependable
          customer support.
        </p>
        <Link className="text-link" to="/leadership">
          View leadership profile →
        </Link>
      </div>
      <aside className="panel dusk">
        <h3>Business positioning</h3>
        <p>
          One coordinated point of engagement for diverse operational requirements — understanding
          the specification, identifying appropriate solutions, maintaining clear communication and
          supporting delivery or execution according to the agreed scope.
        </p>
      </aside>
    </section>
  );
}
