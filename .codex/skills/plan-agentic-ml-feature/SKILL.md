---
name: plan-agentic-ml-feature
description: Plan implementation-ready features and architecture changes for the Agentic ML Research Copilot. Use for feature decomposition, boundary or data-flow design, domain modeling, acceptance criteria, ADR decisions, milestone planning, or changes that span the web app, API, worker, LangGraph orchestration, ML pipeline, sandbox, persistence, and evaluation.
---

# Plan Agentic ML Feature

Turn an idea into a bounded vertical slice with explicit contracts, risks, invariants, and
verification. Do not write production code until the plan removes material ambiguity.

## Workflow

1. Read `AGENTS.md`, `docs/PROJECT_BLUEPRINT.md`, and `docs/ROADMAP.md`.
2. Inspect the current repository and nearest tests; distinguish implemented behavior from
   target architecture.
3. Define the user/system outcome in one sentence and list non-goals.
4. Map the change across domain, trust, process, and persistence boundaries. Read
   [project-map.md](references/project-map.md) when more than one boundary is involved.
5. State durable contracts first: commands, events, entities, IDs, schema versions,
   idempotency keys, error classes, and artifact lineage.
6. Identify invariants and failure modes before the happy path.
7. Slice the work into the smallest end-to-end increment that produces observable value.
8. Specify unit, contract, integration, e2e, eval, security, and migration evidence as
   applicable.
9. Require an ADR for a new trust boundary, durable state semantic, primary infrastructure
   choice, or hard-to-reverse dependency.
10. End with ordered tasks, dependencies, exit criteria, and unresolved decisions.

## Planning rules

- Prefer deterministic ML/data tools; use the LLM to plan and choose, not to reimplement
  statistics or preprocessing.
- Keep FastAPI routes, Celery tasks, LangGraph nodes, and React components thin.
- Assign each invariant to one authoritative module and one test location.
- Treat generated code, tool arguments, uploaded data, and artifact paths as untrusted.
- Make approval scopes precise; approval never disables a security control.
- Add a budget and terminal stop reason to any loop.
- Preserve replayability with dataset fingerprint, code version, configuration, seed, image
  digest, and schema versions.
- State compatibility and rollout behavior for every durable contract change.

## Required output

Produce:

1. outcome and non-goals;
2. current-state evidence;
3. proposed sequence/data flow;
4. affected packages and contract changes;
5. invariants, failure modes, and threat considerations;
6. vertical implementation slices;
7. verification matrix;
8. migration/rollback and observability;
9. ADR decision;
10. open questions that genuinely block implementation.

Do not use "add tests" as a task. Name the behavior, fixture, boundary, and expected evidence.

