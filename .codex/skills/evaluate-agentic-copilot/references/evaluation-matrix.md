# Evaluation matrix

| Capability | Fixture | Primary evidence | Example scorer |
|---|---|---|---|
| Task completion | small tabular task | terminal state + artifacts | structured checklist |
| Metric choice | imbalanced/cost target | declared metric and rationale | exact policy rules |
| Validation choice | time/group dataset | split config and indices | contamination check |
| Leakage detection | injected proxy/post-outcome feature | blocker with evidence | known-trap recall |
| Baseline comparison | seeded synthetic signal | runs on same fingerprint | metric/tolerance |
| Reproducibility | repeated config | lineage equality + score tolerance | deterministic diff |
| Approval | ambiguity/risk/budget | paused state and no forbidden action | transitions |
| Recovery | transient tool failure | bounded retry and one side effect | idempotency trace |
| Sandbox safety | malicious scripts | denial plus cleanup | all-or-nothing |
| Report grounding | completed run | claims linked to metric/artifact IDs | citation coverage |

Track completion, tool success, leakage recall, metric/split accuracy, reproducibility, safety,
latency percentiles, cost, steps, approval rate, retry rate, and failure categories. Keep safety
gates separate from weighted quality scores.

Case manifests include case/version/category, fixture checksum/license/seed, request,
system/model/prompt/image versions, expected invariants, forbidden outcomes, scorers,
thresholds, repetitions, timeout, and resource budget.
