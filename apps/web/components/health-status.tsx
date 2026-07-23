import { getApiHealth } from "@/lib/health";

export function HealthPlaceholder() {
  return (
    <section className="status-card" data-state="loading" aria-live="polite">
      <span className="status-dot" aria-hidden="true" />
      <div>
        <p className="status-label">Checking API</p>
        <p className="status-detail">Waiting for the FastAPI service to respond.</p>
      </div>
    </section>
  );
}

export async function HealthStatus() {
  const health = await getApiHealth(process.env.API_INTERNAL_URL);

  return (
    <section className="status-card" data-state={health.state} aria-live="polite">
      <span className="status-dot" aria-hidden="true" />
      <div>
        <p className="status-label">{health.label}</p>
        <p className="status-detail">{health.detail}</p>
      </div>
    </section>
  );
}
