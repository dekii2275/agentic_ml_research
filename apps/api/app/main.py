from fastapi import APIRouter, FastAPI

from app.config import Settings, get_settings
from app.contracts import HealthResponse
from app.logging_config import configure_logging

health_router = APIRouter(tags=["system"])


@health_router.get(
    "/health",
    response_model=HealthResponse,
    summary="Report API liveness",
)
def get_health() -> HealthResponse:
    return HealthResponse()


def create_app(settings: Settings | None = None) -> FastAPI:
    runtime_settings = settings or get_settings()
    configure_logging(runtime_settings.log_level)

    application = FastAPI(
        title=runtime_settings.app_name,
        version="0.1.0",
        docs_url="/docs" if runtime_settings.environment != "production" else None,
        redoc_url=None,
    )
    application.include_router(health_router)
    return application


app = create_app()
