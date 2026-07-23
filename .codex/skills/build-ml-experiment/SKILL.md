---
name: build-ml-experiment
description: Implement and review leakage-safe, reproducible tabular ML experiments for the Agentic ML Research Copilot. Use for dataset profiling, target and feature rules, validation selection, preprocessing pipelines, baselines, model training, metrics, explainability, experiment tracking, model comparison, leakage or overfitting review, and ML-focused tests or eval fixtures.
---

# Build ML Experiment

Build deterministic ML primitives that can be called safely by an agent. Correct validation,
lineage, and reproducibility take priority over trying more models.

## Workflow

1. Read `AGENTS.md`, inspect dataset/experiment contracts, and read
   [ml-safety-checklist.md](references/ml-safety-checklist.md).
2. Validate task type, target, forbidden/ID/time/group columns, metric, resource limits, and
   seed. Escalate ambiguity to approval instead of guessing.
3. Inspect schema and fingerprint the dataset version without logging sensitive rows.
4. Choose split strategy before feature engineering: time-aware, group-aware, stratified, or
   seeded random in that priority.
5. Detect leakage candidates and duplicates before training. Treat post-outcome or
   inference-unavailable features as blocking findings.
6. Put imputation, encoding, scaling, selection, and model inside a fitted pipeline. Fit only
   on training data/folds.
7. Train a dummy baseline and an interpretable/simple baseline before a complex candidate.
8. Evaluate the declared primary metric plus diagnostics. Do not tune on the final test set.
9. Persist fingerprint, features, split, seed, pipeline, params, versions, timing, metrics,
   logs, findings, and artifact checksums.
10. Run an independent methodological review before selecting "best".

## Invariants

- Never preprocess the whole dataset before splitting.
- Never use target-derived, future, post-outcome, or unavailable-at-inference features.
- Never compare runs from different dataset fingerprints as if directly equivalent.
- Never claim improvement without a baseline and meaningful tolerance/uncertainty check.
- Never use accuracy alone for materially imbalanced classes.
- Never deserialize untrusted model artifacts in a privileged process.

## Completion evidence

Add fixtures for normal data and at least one relevant trap: leakage, time ordering, group
contamination, imbalance, unseen category, missing target, duplicates, or a constant feature.
Assert pipeline fit boundaries and persisted lineage, not only the metric value.

