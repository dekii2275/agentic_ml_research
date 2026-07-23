---
name: build-copilot-slice
description: Implement a tested vertical product slice across Next.js, FastAPI, Celery, PostgreSQL, object storage, and progress streaming for the Agentic ML Research Copilot. Use for project or dataset UI, upload, workflow launch/status, approvals, experiment dashboards, artifact browsing/download, generated API contracts, authorization, or end-to-end feature work.
---

# Build Copilot Slice

Ship one observable user outcome through all required layers while keeping business rules in
domain packages and contracts generated from one source.

## Workflow

1. Read `AGENTS.md`, inspect the nearest feature, and read
   [vertical-slice-contract.md](references/vertical-slice-contract.md).
2. Write acceptance scenarios and authorization rules before transport code.
3. Define canonical Pydantic commands, responses, events, and error codes. Include schema
   version and stable IDs; regenerate TypeScript types.
4. Implement domain behavior and repositories independently of FastAPI, Celery, and React.
5. Add a thin API adapter with validation, auth, idempotency, pagination, and stable errors.
6. Move long work to the worker. Persist state before publishing progress.
7. Add UI states for loading, empty, active, success, failure, stale/reconnect, and permission
   handling. Never derive durable truth solely from an event stream.
8. Add domain/UI unit tests, generated-schema contract tests, a boundary integration test, and
   one e2e happy path.
9. Add telemetry IDs and update docs/ADR for behavior or boundary changes.

## Rules

- Use SSE for one-way progress in MVP; use ordinary commands for approval or mutation.
- Reconcile current status after reconnect and tolerate duplicate/out-of-order events.
- Never put raw datasets, model binaries, or unbounded logs in JSON/events.
- Authorize project, dataset, workflow, experiment, and artifact access server-side.
- Serve artifacts through validated metadata and short-lived access.
- Keep API models separate from ORM models and domain entities.
- Make create/start/approve/cancel operations idempotent.

## Completion evidence

Provide contract diff/generated-client check, backend/frontend tests, integration evidence, an
e2e scenario or screenshot/trace, accessibility/error states, and migration/rollback notes.

