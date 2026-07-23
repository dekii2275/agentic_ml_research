# ML safety checklist

## Split selection

| Signal | Required strategy | Common failure |
|---|---|---|
| Timestamp controls prediction order | chronological or rolling validation | future-to-past leakage |
| Multiple rows per entity | group-aware | same entity in train and validation |
| Rare classification class | stratification plus class-count checks | missing class in a split |
| No time/group semantics | seeded holdout or cross-validation | irreproducible split |

## Leakage review

Check target proxies, post-outcome fields, future/full-dataset aggregates, IDs encoding labels,
cross-split duplicates, preprocessing or resampling outside train folds, and features
unavailable at inference.

## Required run record

Record dataset fingerprint/schema, target and feature roles, split method/indices/seed, fitted
pipeline and parameters, package/code/image versions, metric definitions/threshold, split
metrics, timings, warnings, findings, artifacts, logs, and checksums.

Severity: `blocker` for invalid validation, confirmed leakage, corrupt target, or missing
baseline; `high` for likely inference-unavailable features, severe overfit, or unsupported
conclusions; `medium/low` for quality and documentation gaps.
