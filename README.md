# Agentic ML Research Copilot

Trợ lý AI Data Scientist cho dữ liệu bảng: nhận dataset và yêu cầu bằng ngôn ngữ tự
nhiên, lập kế hoạch, chạy công cụ trong sandbox, theo dõi experiment, tự review rủi ro
ML và tạo báo cáo có thể tái lập.

## Phạm vi MVP

- Bài toán classification/regression trên CSV hoặc Parquet.
- Một workflow tại một thời điểm, LLM dùng qua API, training chủ yếu bằng CPU.
- EDA, baseline, tối đa một số experiment được cấu hình, so sánh và giải thích kết quả.
- Human approval cho target mơ hồ, nguy cơ leakage, đổi metric, vượt budget và thao tác
  artifact có tính phá hủy.
- Code do LLM tạo chỉ chạy trong container cô lập, mặc định không có network.

## Runtime chuẩn

- Toàn bộ backend, worker, ML packages, test và sandbox Python dùng **Python 3.12.x**.
- `pyproject.toml` khi được tạo phải khai báo `requires-python = ">=3.12,<3.13"`.
- Local version được khai báo trong `.python-version`; CI chỉ chạy Python 3.12.
- Docker image phải dùng Python 3.12 và được pin tới patch version/digest trong release.

## Tài liệu

- [Project blueprint](docs/PROJECT_BLUEPRINT.md): mục tiêu, kiến trúc, domain model,
  luồng chính, rủi ro và tiêu chí thành công.
- [Roadmap](docs/ROADMAP.md): thứ tự triển khai từ walking skeleton đến MVP.
- [GitHub workflow](docs/GITHUB_WORKFLOW.md): monorepo, issue, branch, PR, release và
  quản trị quyết định kỹ thuật.
- [ADR-0001](docs/adr/0001-python-312.md): quyết định chuẩn hóa Python 3.12.
- [AI contribution guide](AGENTS.md): quy tắc và skill dành cho coding agent.

## Cấu trúc đích

```text
apps/
  web/                 # Next.js UI
  api/                 # FastAPI HTTP/SSE boundary
services/
  worker/              # Celery jobs and workflow execution
packages/
  agent/               # LangGraph state, nodes, policies
  ml/                  # profiling, validation, training, review
  sandbox/             # isolated code runner
  contracts-python/    # Pydantic command/event schemas
  contracts-ts/        # generated TypeScript schemas
infra/
  docker/              # images and sandbox profiles
  compose/             # local development stack
tests/
  contract/
  integration/
  e2e/
evals/
  cases/
  datasets/
  scorers/
docs/
  adr/
```

Chỉ tạo thư mục khi milestone tương ứng bắt đầu; tránh scaffold hàng loạt nhưng chưa có
owner hoặc test.

## Bộ skill AI

Skill được version-control tại `.codex/skills/`:

- `$plan-agentic-ml-feature`
- `$build-agent-workflow`
- `$build-ml-experiment`
- `$build-secure-sandbox`
- `$build-copilot-slice`
- `$evaluate-agentic-copilot`

Đọc [AGENTS.md](AGENTS.md) để chọn skill và áp dụng quality gate đúng loại thay đổi.

## Trạng thái

Repository đang ở giai đoạn thiết kế. Bước triển khai đầu tiên là Milestone 0 trong
[roadmap](docs/ROADMAP.md): walking skeleton với upload dataset, inspect schema và
stream tiến trình end-to-end.
