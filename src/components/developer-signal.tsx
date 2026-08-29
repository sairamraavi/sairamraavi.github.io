import { Activity, Boxes, CloudCog, GitPullRequest } from "lucide-react";

const signals = [
  { icon: GitPullRequest, label: "Delivery", value: "GitHub → CI/CD" },
  { icon: Boxes, label: "Runtime", value: "Docker & Kubernetes" },
  { icon: CloudCog, label: "Cloud", value: "AWS-first learning labs" },
  { icon: Activity, label: "Practice", value: "Build, observe, improve" },
];

export function DeveloperSignal() {
  return (
    <aside className="developer-signal" aria-label="Engineering focus">
      <div className="developer-signal-heading">
        <span className="status-dot" aria-hidden="true" />
        <span>Current engineering focus</span>
      </div>
      <div className="developer-signal-list">
        {signals.map(({ icon: Icon, label, value }) => (
          <div className="developer-signal-item" key={label}>
            <Icon size={17} aria-hidden="true" />
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </div>
      <p>
        Applying full-stack experience to reliable cloud delivery and platform
        engineering.
      </p>
    </aside>
  );
}
