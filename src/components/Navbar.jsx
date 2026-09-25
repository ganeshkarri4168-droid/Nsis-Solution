import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <img src="/nsis-mark.png?v=2" alt="" className="brand-globe" />
          <span>
            <strong>NSIS</strong>
            <em>Techno Solutions</em>
          </span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <div className="nav-group">
            <span>Company</span>
            <div className="nav-drop">
              <NavLink to="/snapshot">01 Snapshot</NavLink>
              <NavLink to="/about">02 Leadership</NavLink>
              <NavLink to="/principles">03 Principles</NavLink>
            </div>
          </div>
          <div className="nav-group">
            <span>Capabilities</span>
            <div className="nav-drop">
              <NavLink to="/services">All capabilities</NavLink>
              <NavLink to="/procurement">04 Procurement & IT</NavLink>
              <NavLink to="/engineering">05 Engineering</NavLink>
            </div>
          </div>
          <NavLink to="/approach">Approach</NavLink>
          <NavLink to="/credentials">Credentials</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/admin" className="nav-admin">
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
