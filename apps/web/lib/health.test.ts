import { describe, expect, it, vi } from "vitest";

import { getApiHealth } from "./health";

describe("getApiHealth", () => {
  it("maps a valid health contract to the online view", async () => {
    const fetcher = vi.fn(async () =>
      Response.json({ status: "ok", service: "api" }, { status: 200 }),
    );

    const health = await getApiHealth("http://api:8000", fetcher);

    expect(fetcher).toHaveBeenCalledWith(
      "http://api:8000/health",
      expect.objectContaining({ cache: "no-store" }),
    );
    expect(health.state).toBe("online");
  });

  it("returns unavailable when the API request fails", async () => {
    const fetcher = vi.fn(async () => {
      throw new Error("connection refused");
    });

    const health = await getApiHealth("http://api:8000", fetcher);

    expect(health).toEqual({
      state: "unavailable",
      label: "API unavailable",
      detail: "The web application is running, but FastAPI did not respond.",
    });
  });

  it("returns unavailable when the backend URL is missing", async () => {
    const health = await getApiHealth(undefined);

    expect(health.detail).toBe("API_INTERNAL_URL is not configured.");
  });
});
