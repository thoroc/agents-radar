import { beforeEach, describe, expect, it, vi } from "vitest";
import { closeStaleIssues } from "./close-stale-issues";

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  globalThis.fetch = mockFetch;
});

describe("closeStaleIssues", () => {
  it("returns 0 when DIGEST_REPO is empty", async () => {
    const result = await closeStaleIssues(7, "token", "");

    expect(result).toBe(0);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("closes stale issues and returns count", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { number: 1, created_at: "2020-01-01T00:00:00Z" },
        { number: 2, created_at: "2020-06-15T00:00:00Z" },
      ],
    });
    mockFetch.mockResolvedValueOnce({ ok: true });
    mockFetch.mockResolvedValueOnce({ ok: true });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const result = await closeStaleIssues(1, "token", "owner/repo");

    expect(result).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(4);
    expect(mockFetch.mock.calls[0]![0]).toContain("issues?state=open");
  });

  it("returns 0 when no issues are stale", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ number: 1, created_at: new Date().toISOString() }],
    });

    const result = await closeStaleIssues(365, "token", "owner/repo");

    expect(result).toBe(0);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("breaks on empty issues list", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const result = await closeStaleIssues(7, "token", "owner/repo");

    expect(result).toBe(0);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("throws on fetch error", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(closeStaleIssues(7, "token", "owner/repo")).rejects.toThrow("Failed to fetch issues: 500");
  });
});
