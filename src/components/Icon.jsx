const PATHS = {
  gov: "M4 20h16v-2H4v2zm2-4h12V8L12 4 6 8v8z",
  it: "M4 5h16v10H4V5zm2 12h12v2H6v-2z",
  cctv: "M4 8l10 4-10 4V8zm12 2h4v6h-4v-6z",
  print: "M6 9V4h12v5M6 14h12v6H6v-6zM6 9H4v5h2m14-5h2v5h-2",
  file: "M6 3h8l4 4v14H6V3z",
  tool: "M14 4l6 6-3 3-6-6V4h3zM4 20l7-7",
  lab: "M8 3h8v4l-3 6v6H11v-6L8 7V3z",
  civil: "M3 20h18M5 20V10l7-5 7 5v10",
  power: "M13 2L4 14h7l-1 8 10-14h-7l0-6z",
  gear: "M12 8a4 4 0 100 8 4 4 0 000-8zm9 4l-2-1 1-3-2-2-3 1-1-2h-4l-1 2-3-1-2 2 1 3-2 1v2l2 1-1 3 2 2 3-1 1 2h4l1-2 3 1 2-2-1-3 2-1v-2z",
  building: "M4 20V8h6V4h4v4h6v12H4zm4-4h2v4H8v-4zm6 0h2v4h-2v-4z",
  chair: "M7 10h10v4H7v-4zM8 14v6M16 14v6M6 20h12",
  home: "M4 11l8-7 8 7v9H4v-9z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z",
  facility: "M4 20V9l8-5 8 5v11H4zm4-6h8v6H8v-6z",
  phone: "M7 3h3l1.4 3.4-2 1.2a12 12 0 006 6l1.2-2L19 13v3a1 1 0 01-1 1A14 14 0 016 7a1 1 0 011-1z",
  mail: "M4 6h16v12H4V6zm0 0l8 6 8-6",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z",
  chat: "M5 5h14v10H8l-3 3V5zm4 4h6M9 12h4",
  arrow: "M5 12h12M13 6l6 6-6 6",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
};

export default function Icon({ name, className = "icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={PATHS[name] || PATHS.file} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
