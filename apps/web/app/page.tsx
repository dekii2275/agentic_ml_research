import { Suspense } from "react";

import { HealthPlaceholder, HealthStatus } from "@/components/health-status";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <div className="shell">
        <p className="eyebrow">System foundation</p>
        <h1>Agentic ML Research Copilot</h1>
        <p className="lede">
          A controlled, reproducible workspace for turning tabular data and a research goal
          into evidence-backed machine learning experiments.
        </p>
        <Suspense fallback={<HealthPlaceholder />}>
          <HealthStatus />
        </Suspense>
      </div>
    </main>
  );
}
