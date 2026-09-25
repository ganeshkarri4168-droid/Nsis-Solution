import { COMPANY } from "../data.js";

export default function PageHero({ kicker, title, lede }) {
  return (
    <header className="page-hero">
      <p className="eyebrow">{kicker || COMPANY.name}</p>
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  );
}
