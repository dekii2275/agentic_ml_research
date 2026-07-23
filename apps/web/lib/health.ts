type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

type ApiHealthPayload = {
  status: "ok";
  service: "api";
};

export type ApiHealthView =
  | {
      state: "online";
      label: "API online";
      detail: string;
    }
  | {
      state: "unavailable";
      label: "API unavailable";
      detail: string;
    };

function isApiHealthPayload(value: unknown): value is ApiHealthPayload {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const payload = value as Record<string, unknown>;
  return payload.status === "ok" && payload.service === "api";
}

export async function getApiHealth(
  baseUrl: string | undefined,
  fetcher: Fetcher = fetch,
): Promise<ApiHealthView> {
  if (!baseUrl) {
    return {
      state: "unavailable",
      label: "API unavailable",
      detail: "API_INTERNAL_URL is not configured.",
    };
  }

  try {
    const response = await fetcher(`${baseUrl.replace(/\/$/, "")}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3_000),
    });

    if (!response.ok || !isApiHealthPayload(await response.json())) {
      throw new Error("Unexpected API health response");
    }

    return {
      state: "online",
      label: "API online",
      detail: "FastAPI is healthy and ready for the next vertical slice.",
    };
  } catch {
    return {
      state: "unavailable",
      label: "API unavailable",
      detail: "The web application is running, but FastAPI did not respond.",
    };
  }
}
