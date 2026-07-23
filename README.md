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
- Web foundation dùng Node.js 24.14.0 và pnpm 11.9.0, được pin trong repository.

## Chạy M0-01 ở local

### Yêu cầu

- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- Node.js 24.14.0
- Corepack/pnpm 11.9.0
- Docker Desktop với Docker Compose v2 nếu chạy bằng container

Không dùng Python 3.14 global của máy. `uv` sẽ quản lý interpreter và `.venv` Python 3.12
riêng cho API.

### Cài dependency

Trong PowerShell tại repository root:

```powershell
uv python install 3.12
uv sync --project apps/api

corepack enable
corepack prepare pnpm@11.9.0 --activate
pnpm install --frozen-lockfile
```

### Chạy từng service

Terminal API:

```powershell
uv run --project apps/api uvicorn app.main:app --app-dir apps/api --reload
```

Terminal web:

```powershell
$env:API_INTERNAL_URL = "http://127.0.0.1:8000"
pnpm web:dev
```

Mở `http://127.0.0.1:3000`; API docs ở `http://127.0.0.1:8000/docs`.

### Chạy bằng Docker

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Compose khởi động API trước, chờ `/health` thành công rồi mới khởi động web. `.env` là file
local và không được commit.

### Quality checks

Backend:

```powershell
uv run --project apps/api ruff format --check apps/api
uv run --project apps/api ruff check apps/api
uv run --project apps/api mypy --config-file apps/api/pyproject.toml apps/api/app apps/api/tests
uv run --project apps/api pytest apps/api/tests
```

Frontend:

```powershell
pnpm web:lint
pnpm web:typecheck
pnpm web:test
$env:API_INTERNAL_URL = "http://127.0.0.1:8000"
pnpm web:build
```

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
