---
name: build-secure-sandbox
description: Implement and review isolated execution of LLM-generated Python for the Agentic ML Research Copilot. Use for Docker sandbox lifecycle, execution policy, resource and network limits, workspace or artifact handling, package allowlists, timeout and cleanup, runner APIs, threat modeling, or adversarial sandbox tests.
---

# Build Secure Sandbox

Treat generated code as actively hostile. Make isolation deny-by-default and test the boundary
with real containers; approval never substitutes for a control.

## Workflow

1. Read `AGENTS.md` and [threat-model.md](references/threat-model.md).
2. Trace code, inputs, credentials, mounts, network, runtime, outputs, logs, artifacts,
   cleanup, and caller authorization across the execution lifecycle.
3. Reject any design that executes generated code in the API/worker process, mounts the
   Docker socket, uses privileged mode, or exposes host/project paths.
4. Pin an allowlisted image by digest. Run as a numeric non-root user with read-only root,
   minimal writable workspace, dropped capabilities, `no-new-privileges`, PID/CPU/RAM/disk/
   time/output limits, and network disabled.
5. Create a fresh workspace per invocation. Copy only declared inputs; normalize and verify
   paths. Never follow artifact symlinks outside the workspace.
6. Return a typed result with exit status, sanitized output references, resource use, and a
   checksummed artifact manifest.
7. Kill the whole container on timeout/cancel and clean up idempotently after every outcome.
8. Add real-container adversarial tests before enabling the capability.

## Required tests

Test file traversal, absolute paths, symlink escape, environment probing, network access,
process bombs, memory/disk exhaustion, timeout, stdout flood, dangerous deserialization,
artifact limits, cancellation, orphan cleanup, and duplicate invocation.

Tests must assert denial and cleanup, not merely a nonzero exit code.

## Completion evidence

Provide the updated threat analysis, exact runtime controls, real-container test results,
resource-limit behavior, cleanup evidence, and rollback. Flag Docker's weaker isolation before
hostile multi-tenancy and recommend a stronger runtime boundary.

