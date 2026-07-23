# Project boundary map

| Boundary | Owns | Must not own |
|---|---|---|
| `apps/web` | interaction, visualization, typed API client | ML rules, durable workflow truth |
| `apps/api` | auth, authorization, upload/download, HTTP/SSE | training, agent decisions |
| `services/worker` | job lifecycle and delivery adapters | business rules hidden in tasks |
| `packages/agent` | state machine, policy, budget, approval | direct infrastructure writes |
| `packages/ml` | deterministic profiling/training/review primitives | LLM prompts, HTTP |
| `packages/sandbox` | execution policy, lifecycle, result manifest | product approval policy |
| `packages/contracts-python` | canonical commands/events/schemas | business implementation |
| `packages/contracts-ts` | generated client-side contracts | handwritten schema forks |
| PostgreSQL | product entities, workflow state, approvals | large binary artifacts |
| MLflow | run parameters, metrics, tracking links | product authorization |
| S3/MinIO | immutable datasets and artifacts | workflow truth |
| Redis | queue and ephemeral coordination | sole durable state |

## Cross-boundary invariants

- API request IDs propagate to job, workflow, tool, experiment, trace, and artifact metadata.
- Durable messages include `schema_version`, stable entity IDs, UTC time, and idempotency key.
- The receiver validates every cross-process message even if the sender already validated it.
- Artifact access is authorized through product metadata; storage URI alone grants nothing.
- The agent calls narrow tools; it never receives database, MLflow, storage, or Docker
  credentials.

## ADR triggers

Write an ADR when choosing or changing workflow checkpoint semantics, event transport,
canonical schema generation, dataset fingerprinting, sandbox isolation, persistence
responsibility, authentication, or multi-tenancy.
