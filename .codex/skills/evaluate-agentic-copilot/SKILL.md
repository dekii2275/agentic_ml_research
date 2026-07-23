---
name: evaluate-agentic-copilot
description: Build and review evaluation, observability, and release quality gates for the Agentic ML Research Copilot. Use for benchmark datasets, task cases, deterministic scorers, workflow replay, leakage or metric-selection evaluation, sandbox safety cases, trace schemas, latency/token/cost measurement, regression thresholds, or comparing agent and prompt changes.
---

# Evaluate Agentic Copilot

Convert product claims and failure risks into versioned executable cases. Prefer invariant and
artifact scoring over judging only the final natural-language answer.

## Workflow

1. Read `AGENTS.md` and [evaluation-matrix.md](references/evaluation-matrix.md).
2. Name the capability, failure prevented, unit of evaluation, and release decision.
3. Create a small synthetic/redistributable fixture with version and checksum.
4. Define required and forbidden transitions/tool calls, ML decisions, artifact lineage,
   safety behavior, and cost/latency/step limits before running.
5. Use deterministic scorers first. Use a pinned, calibrated LLM judge only for qualities that
   cannot be reduced to structured evidence.
6. Run multiple seeds for nondeterministic behavior; report distributions, not the best run.
7. Store config, app/model/prompt versions, commit, fixture checksum, traces, scores, cost,
   latency, and failure categories.
8. Compare with a frozen baseline using thresholds chosen before inspecting results.
9. Put a smoke subset in PR CI and the full suite in release/nightly gates.

## Rules

- Propagate correlation IDs through workflow, tool, experiment, and artifact.
- Redact secrets/sensitive values and reference data by authorized IDs.
- Make failed scorers identify the invariant and evidence.
- Do not score only keyword overlap or final prose.
- Do not silently change fixtures, judges, thresholds, or baselines.
- Do not average away safety failures; critical cases require 100% pass.
- Do not claim improvement when repeated runs overlap materially.

## Completion evidence

Provide the case manifest, scorer tests, local/CI command, baseline comparison, failure
breakdown, trace sample, release threshold, and fixture licensing/provenance.

