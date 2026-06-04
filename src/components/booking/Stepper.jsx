const STEPS = [
  { key: "select", label: "Select Tickets" },
  { key: "attendees", label: "Attendee Details" },
  { key: "confirm", label: "Confirmation" },
];

export default function Stepper({ currentStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="stepper" data-current-step={currentStep}>
      {STEPS.map((step, i) => {
        const status =
          i < currentIndex ? "done" : i === currentIndex ? "active" : "todo";
        return (
          <div key={step.key} className={`step ${status}`}>
            <div className="step-dot">{i + 1}</div>
            <span className="step-label">{step.label}</span>
            {i < STEPS.length - 1 && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}
