---
name: build-agent-workflow
description: Implement and review reliable LangGraph workflows for the Agentic ML Research Copilot. Use when changing agent state, planner or reviewer nodes, structured tool calling, retry and recovery, human approval, checkpoint/resume behavior, experiment or token budgets, stop conditions, progress events, or workflow tests.
---

# Build Agent Workflow

Build an auditable state machine around validated deterministic tools. Agent autonomy is
bounded by policy, budget, and durable state.

## Workflow

1. Read `AGENTS.md` and inspect existing state, contracts, checkpointer, and tests.
2. Read [workflow-contracts.md](references/workflow-contracts.md) before changing durable
   state, approvals, retries, or progress events.
3. Define the transition table: source state, event, guard, action, target state, persisted
   evidence, and failure result.
4. Define typed inputs/outputs for each node and tool. Reject unknown or invalid fields.
5. Keep nodes small: derive a decision, call one bounded capability, or reduce a result.
6. Persist before external side effects and before entering an approval pause. Use stable
   idempotency keys when a side effect can be retried.
7. Classify errors as validation/policy, transient infrastructure, execution/model, or an
   internal invariant. Retry only transient errors with a bounded policy.
8. Enforce max steps, max experiments, wall-clock/token/cost limits, and an explicit terminal
   stop reason.
9. Emit sanitized progress events after committed transitions.
10. Test replay, process restart, duplicate delivery, approval decisions, exhausted budget,
    invalid tool output, transient recovery, and terminal failure.

## Invariants

- Never store live clients, file handles, secrets, or large dataframes in graph state.
- Never make raw LLM text authoritative; parse into versioned schemas.
- Never let a reviewer silently mutate an experiment. It returns findings and remediation.
- Never auto-approve ambiguity, leakage risk, metric changes, extra budget, destructive
  artifact operations, or expensive execution.
- Never retry a non-idempotent side effect without a deduplication record.
- Never hide a policy refusal as a tool failure.

## Completion evidence

Provide a transition table or diagram, schema diff, focused tests, one restart/resume
integration test, and an eval case when the change affects decisions. Include trace IDs and
stop reasons in assertions; do not assert only final prose.

