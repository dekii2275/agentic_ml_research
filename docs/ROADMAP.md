# Roadmap

Roadmap đi theo vertical slice. Mỗi milestone phải có demo end-to-end, test và artifact;
không xây toàn bộ frontend rồi mới nối backend.

## M0 - Foundation và walking skeleton

Mục tiêu: chứng minh đường đi `web -> API -> worker -> event -> web`.

- Chuẩn hóa Python 3.12.x bằng `.python-version`, `requires-python` và CI.
- Khởi tạo monorepo, lockfiles, Docker Compose, lint/type/test commands.
- Tạo Project và DatasetVersion; upload file nhỏ vào local object storage.
- `inspect_dataset` trả schema và fingerprint.
- Celery job phát progress qua SSE.
- CI chạy format, lint, typecheck, unit và secret scan.
- Viết ADR cho monorepo, persistence và event transport.

Exit criteria: upload dataset, xem schema và progress trong UI; integration test chạy được
trên máy mới bằng một lệnh.

## M1 - Deterministic data analysis

- `profile_dataset`, target analysis, missing/duplicate/cardinality checks.
- Sinh EDA plots và artifact manifest.
- Chính sách giới hạn file, row/column, MIME và decompression.
- Test fixtures cho numeric, categorical, imbalance, time column và malformed input.

Exit criteria: profile tái lập được, không cần LLM và không đọc toàn bộ file vượt memory.

## M2 - Experiment engine

- Chọn split theo random/stratified/group/time.
- Preprocessing pipeline leakage-safe.
- Dummy và linear baseline; một tree candidate.
- MLflow tracking, experiment config, model/metrics/log artifacts.
- Compare experiments theo metric chính và secondary metrics.

Exit criteria: chạy lại cùng dataset fingerprint/config/seed cho kết quả trong tolerance.

## M3 - Agent orchestration và approval

- Typed LangGraph state, planner, tool gateway, budget và stop reason.
- Durable checkpoint, retry policy và idempotent resume.
- Approval cho target, leakage, metric change và budget.
- UI hiển thị plan, node status, tool calls và approval.

Exit criteria: workflow có thể pause/restart process/resume mà không chạy trùng experiment.

## M4 - Secure code sandbox

- Image allowlist, non-root, read-only root, network none và resource limits.
- `run_python` với input/output schema và artifact collection.
- Adversarial tests: file escape, network, fork bomb, timeout, output flood, symlink.
- Quota và cleanup kể cả khi worker crash.

Exit criteria: test security bắt buộc xanh; không có đường chạy generated code trong
API/worker process.

## M5 - Reviewer, report và memory

- Reviewer verdict có severity/evidence/remediation.
- Remediation loop bị giới hạn bởi budget.
- Report Markdown/PDF, model card và downloadable reproducibility bundle.
- Truy vấn lịch sử project/dataset/experiment cho follow-up question.

Exit criteria: report không claim vượt evidence; mọi claim chính liên kết metric/artifact.

## M6 - Evaluation và beta hardening

- Bộ eval versioned với normal, ambiguous, leakage và adversarial cases.
- Quality dashboard cho success, safety, latency và cost.
- Authentication/authorization, signed artifact URLs, retention và backup.
- Load/failure tests, OpenTelemetry, runbooks và release checklist.

Exit criteria: đạt ngưỡng benchmark đã công bố và hoàn thành threat-model review.

## Thứ tự ưu tiên nếu làm một mình

1. M0 + M1 để có sản phẩm nhìn thấy được.
2. M2 để tạo giá trị ML thật trước khi thêm agent.
3. M3 để agent điều phối các primitive đã được kiểm chứng.
4. M4 trước khi cho phép code tự do.
5. M5 + M6 để nâng từ demo lên beta.

Không đưa `run_python` vào demo sớm chỉ để tạo cảm giác agentic; deterministic tools bao
phủ phần lớn MVP với bề mặt tấn công nhỏ hơn.
