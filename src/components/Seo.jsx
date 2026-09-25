import { useEffect } from "react";

export default function Seo({ title, description }) {
  useEffect(() => {
    const full = title.includes("NSIS") ? title : `${title} | NSIS Techno Solutions`;
    document.title = full;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", full);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute("content", description);
  }, [title, description]);
  return null;
}
