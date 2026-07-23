# AI Contribution Guide

## Mission

Build a trustworthy junior-level AI Data Scientist for tabular ML. Optimize for safety,
reproducibility, inspectability, and evidence-backed decisions before model sophistication.

## Read before changing code

1. Read `README.md` and the relevant section of `docs/PROJECT_BLUEPRINT.md`.
2. Read `docs/GITHUB_WORKFLOW.md` for boundaries and change-management rules.
3. Inspect the nearest tests and package-level instructions before editing.
4. Load the smallest applicable project skill:

| Work | Skill |
|---|---|
| Scope a feature or change boundaries | `$plan-agentic-ml-feature` |
| LangGraph state, nodes, tools, approval, retry, resume | `$build-agent-workflow` |
| EDA, split, preprocessing, training, metrics, leakage review | `$build-ml-experiment` |
| Execute generated code or manage containers/resources | `$build-secure-sandbox` |
| Implement UI + API + job + persistence as one feature | `$build-copilot-slice` |
| Add traces, benchmarks, scorers, or release gates | `$evaluate-agentic-copilot` |

Use multiple skills only when the change genuinely crosses those boundaries.

## Non-negotiable invariants

- Use Python 3.12.x for every Python package, service, test, CI job, and sandbox image.
  Declare `requires-python = ">=3.12,<3.13"` when creating Python packaging metadata.
  Do not introduce another Python minor version without an ADR.
- Never execute LLM-generated code inside the API or worker process.
- Keep network disabled in the sandbox unless an explicit allowlist and approval exist.
- Never fit preprocessing on validation or test data.
- Persist dataset fingerprint, split strategy, feature list, seed, code version, parameters,
  metrics, logs, and artifacts for every experiment.
- Require an explicit baseline before claiming improvement.
- Treat agent output as untrusted structured data; validate at every tool boundary.
- Persist workflow state before an approval pause and make resume idempotent.
- Never expose secrets, raw credentials, internal paths, or unrestricted artifact URLs.
- Do not let the LLM write directly to PostgreSQL, MLflow, object storage, or the host
  filesystem. Route writes through narrow, validated tools.

## Change discipline

- Prefer a vertical slice that is demonstrable and tested over a broad unfinished layer.
- Keep domain logic out of FastAPI routes, React components, Celery tasks, and LangGraph
  node wrappers.
- Define Pydantic contracts first; derive TypeScript types rather than maintaining two
  handwritten versions.
- Use stable IDs (`project_id`, `dataset_id`, `workflow_id`, `experiment_id`,
  `artifact_id`) and include `schema_version` in durable events.
- Use UTC timestamps and explicit state transitions.
- Add or update an ADR when changing a trust boundary, persistence model, workflow
  semantics, or primary infrastructure choice.

## Required checks

Run the narrowest relevant checks while iterating, then the package suite before handoff.
Every PR must include:

- tests for success, validation failure, and one meaningful recovery path;
- migration or compatibility notes for contract/schema changes;
- security tests for sandbox or artifact-access changes;
- an eval case for changes to agent decisions or ML methodology;
- documentation updates when behavior, configuration, or ownership changes.

Do not declare success using mocked tool output alone for critical paths. Include at least one
integration test across the real boundary being changed.
