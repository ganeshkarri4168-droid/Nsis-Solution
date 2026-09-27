import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  { src: "/slides/procurement.jpg", title: "Government procurement", text: "Structured sourcing and tender support" },
  { src: "/slides/project.jpg", title: "Specification & documentation", text: "Clear briefs, quotations and records" },
  { src: "/slides/it.jpg", title: "IT & office technology", text: "Hardware, networking and automation" },
  { src: "/slides/civil.jpg", title: "Civil & infrastructure", text: "Works, repairs and site coordination" },
  { src: "/slides/electrical.jpg", title: "Electrical & engineering", text: "Installation, maintenance and support" },
  { src: "/slides/infrastructure.jpg", title: "Project execution", text: "Supply, works and delivery across India" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % SLIDES.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (next) => {
    setIndex((value) => (next + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[index];

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

        <div
          className="hero-art hero-slideshow"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {SLIDES.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.title}
              className={i === index ? "is-active" : ""}
            />
          ))}
          <div className="hero-slide-copy">
            <p className="eyebrow">{slide.title}</p>
            <p>{slide.text}</p>
          </div>
          <button
            type="button"
            className="hero-slide-nav prev"
            aria-label="Previous photo"
            onClick={() => go(index - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="hero-slide-nav next"
            aria-label="Next photo"
            onClick={() => go(index + 1)}
          >
            ›
          </button>
          <div className="hero-slide-dots">
            {SLIDES.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className={i === index ? "is-active" : ""}
                aria-label={`Show ${item.title}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
