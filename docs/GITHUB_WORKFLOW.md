# GitHub Workflow

## 1. Mô hình repository

Dùng monorepo trong giai đoạn MVP để thay đổi contract, UI, API, agent và test trong cùng
một PR. Tách repository chỉ khi có team/chu kỳ release/quyền truy cập độc lập thật sự.

```text
apps/web                     Next.js
apps/api                     FastAPI
services/worker              Celery entrypoint
packages/agent               orchestration domain
packages/ml                  deterministic ML domain
packages/sandbox             runner client and policy
packages/contracts-python    source schemas
packages/contracts-ts        generated package
infra/docker                 images and security profiles
infra/compose                local stack
tests/{contract,integration,e2e}
evals/{cases,datasets,scorers}
docs/adr
.codex/skills                versioned AI workflows
```

Tránh thư mục chung kiểu `utils/`. Code dùng chung phải có một trách nhiệm, API public và
owner rõ ràng.

## 2. Issue và planning

Mỗi issue cần nêu:

- user/problem outcome;
- phạm vi và phần không làm;
- acceptance criteria đo được;
- risk: ML, security, data migration, cost;
- test/eval cần thêm;
- dependency hoặc ADR liên quan.

Dùng ba template: feature, bug và eval case. Epic chỉ là nhóm outcome; task triển khai nên
đủ nhỏ để hoàn thành trong một PR review được.

Label gợi ý:

- `area:web`, `area:api`, `area:agent`, `area:ml`, `area:sandbox`, `area:infra`;
- `type:feature`, `type:bug`, `type:eval`, `type:security`, `type:docs`;
- `risk:high`, `needs:adr`, `breaking-change`;
- `priority:p0` đến `priority:p3`.

## 3. Branch và commit

- Bảo vệ `main`; không push trực tiếp.
- Branch ngắn hạn: `feat/<issue>-<slug>`, `fix/<issue>-<slug>`,
  `eval/<issue>-<slug>`, `docs/<issue>-<slug>`.
- Rebase/update trước merge; ưu tiên squash merge để lịch sử main dễ đọc.
- Commit dùng Conventional Commits: `feat(agent): ...`, `fix(ml): ...`,
  `test(sandbox): ...`, `docs(adr): ...`.
- Không commit dataset thật, secret, model lớn, `.env`, MLflow local state hoặc artifact.
  Dùng fixture nhỏ/synthetic; dữ liệu lớn ở object storage/DVC nếu sau này cần.

## 4. Pull request

PR nên dưới khoảng 400 dòng logic thay đổi khi có thể. Tách refactor khỏi behavior change.
PR phải có:

- liên kết issue và mô tả outcome;
- ảnh/video cho UI hoặc sample trace/report cho workflow;
- test đã chạy;
- eval delta cho thay đổi agent/ML;
- migration/rollback cho schema hoặc deployment;
- threat-model note cho sandbox, upload, auth hoặc artifact access.

Review bắt buộc từ owner của boundary bị ảnh hưởng. PR `risk:high`, security boundary,
database migration hoặc breaking contract cần hai lượt review hoặc một review chuyên môn
riêng khi team đủ người.

## 5. CI theo tầng

Trên mọi PR:

1. format/lint;
2. Python 3.12 và TypeScript typecheck;
3. unit + contract tests;
4. build web/API/worker images;
5. dependency và secret scan.

Khi label/path liên quan:

- `packages/ml/**`: reproducibility và leakage fixtures;
- `packages/agent/**`: workflow replay/eval smoke;
- `packages/sandbox/**` hoặc `infra/docker/**`: adversarial sandbox integration suite;
- contract/schema: generated client sạch và backward-compatibility check;
- trước release: Docker Compose e2e + full eval benchmark.

Không cho phép flaky test được retry vô hạn. Quarantine phải có owner, issue và thời hạn.

## 6. Versioning và release

- Bắt đầu bằng release train nhỏ (`v0.1.0`, `v0.2.0`) và changelog tự sinh từ PR.
- Version riêng cho durable event, tool input/output và experiment config.
- Artifact report ghi app version, commit SHA, sandbox image digest và schema versions.
- Tag release chỉ từ `main` sau khi e2e/eval/security gate đạt.

## 7. ADR và ownership

Tạo `docs/adr/NNNN-short-title.md` cho quyết định khó đảo ngược: workflow engine,
event transport, persistence split, sandbox runtime, auth và artifact storage. ADR gồm
context, decision, alternatives, consequences và status.

Thêm `CODEOWNERS` khi đã biết username/team thật; không commit placeholder vô hiệu. Owner
nên theo boundary (`web`, `api`, `agent`, `ml`, `sandbox`, `infra`) thay vì theo loại file.

## 8. GitHub Projects

Board đơn giản:

`Backlog -> Ready -> In progress -> In review -> Validation -> Done`

Custom fields: milestone, area, priority, risk và target release. Giới hạn WIP cá nhân:
một feature chính; security/production bug có thể là lane ngoại lệ.
