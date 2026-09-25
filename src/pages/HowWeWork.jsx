import CTASection from "../components/CTASection.jsx";
import PageHero from "../components/PageHero.jsx";
import ProcessTimeline from "../components/ProcessTimeline.jsx";
import Seo from "../components/Seo.jsx";

export default function HowWeWork() {
  return (
    <main className="page">
      <Seo
        title="How We Work | NSIS Techno Solutions"
        description="NSIS Techno Solutions follows a six-step delivery approach: understand, identify, propose, coordinate, deliver and support."
      />
      <PageHero
        kicker="How we work"
        title="A disciplined workflow for specification-driven requirements."
        lede="The same sequence applies whether the brief is a supply order, an installation or a small works package."
      />
      <ProcessTimeline />
      <CTASection title="Send the specification, quantity, location and timeline." />
    </main>
  );
}
