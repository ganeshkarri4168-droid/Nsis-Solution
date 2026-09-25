import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { COMPANY } from "../data.js";

const LINKS = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/solutions", "Solutions"],
  ["/how-we-work", "How We Work"],
  ["/why-nsis", "Why NSIS"],
  ["/contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <img src="/nsis-mark.png?v=2" alt="NSIS Techno Solutions logo" className="brand-globe" />
          <span>
            <strong>NSIS</strong>
            <em>Techno Solutions</em>
          </span>
        </NavLink>

        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={open ? "nav-links open" : "nav-links"}>
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
          <Link className="btn btn-quote nav-admin" to="/admin">
            Sign In
          </Link>
        </nav>
      </div>
      <p className="sr-only">{COMPANY.tagline}</p>
    </header>
  );
}
