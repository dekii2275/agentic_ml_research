# Workflow contracts

## Durable state fields

- `workflow_id`, `project_id`, `dataset_version_id`
- `schema_version`, `revision`, `status`
- normalized user goal and constraints
- current plan and completed/pending task IDs
- tool result references, never large payloads
- experiment IDs and reviewer verdict IDs
- approval request/decision references
- experiment, step, token, cost, and wall-clock budgets
- last committed event ID and terminal stop reason

Use optimistic concurrency on `revision`. A resume command targets a specific workflow and
pending approval; duplicate commands return the already-recorded result.

## Approval contract

Include the subject, exact proposed action, reason, evidence references, bounded scope,
estimated resource/cost impact, alternatives, expiry, and state revision. Reject stale
approval when the workflow revision or proposed action changed.

## Tool result envelope

```text
schema_version
invocation_id
idempotency_key
status: succeeded | rejected | failed | timed_out
started_at / finished_at
result or typed error
artifact_manifest[]
resource_usage
sanitized_log_ref
```

Emit progress only after state is durable. Include a monotonic sequence and correlation IDs;
never include secrets, raw dataset rows, full prompts, or unrestricted storage paths.
