# Vertical slice contract

Mutation commands include stable actor/project/resource IDs, `schema_version`, idempotency key,
expected revision when needed, and a bounded payload. Return `202` plus resource/workflow ID
for queued work. Return the existing result for an equivalent duplicate; reject key reuse with
a different payload.

Progress events include:

```text
event_id, sequence, schema_version, workflow_id, type, status, occurred_at,
correlation_id, causation_id, summary, resource_reference
```

The client stores the last event ID, reconnects, tolerates duplicates, and fetches current
status if a gap is detected.

Stable errors include a machine code, safe message, correlation ID, optional field errors, and
retryability. Never expose stack traces, SQL, internal paths, prompts, or provider errors.

Every remote UI surface handles loading, empty, validation, forbidden/not-found,
queued/running, awaiting approval, retryable/terminal failure, cancelled, complete, and stale/
reconnect states.
