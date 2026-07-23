from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings sourced from COPILOT_API_* environment variables."""

    model_config = SettingsConfigDict(
        env_prefix="COPILOT_API_",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "Agentic ML Research Copilot API"
    environment: Literal["development", "test", "production"] = "development"
    log_level: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"


@lru_cache
def get_settings() -> Settings:
    return Settings()
