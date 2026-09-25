import { PROCESS } from "../data.js";

export default function ProcessTimeline() {
  return (
    <ol className="process-list">
      {PROCESS.map((step) => (
        <li key={step.no}>
          <strong>
            {step.no} — {step.title}
          </strong>
          <span>{step.text}</span>
        </li>
      ))}
    </ol>
  );
}
