import { beforeEach, describe, expect, it, vi } from "vitest";
import { githubGet, headers } from "./http";

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  globalThis.fetch = mockFetch;
});

describe("headers", () => {
  it("returns correct header object", () => {
    const result = headers("token-123");
    expect(result).toEqual({
      Authorization: "Bearer token-123",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    });
  });
});

describe("githubGet", () => {
  it("makes a GET request and returns parsed JSON", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: "test" }],
    });

    const result = await githubGet<{ id: number; name: string }[]>(
      "https://api.github.com/repos/owner/repo/issues",
      "token-123",
    );

    expect(result).toEqual([{ id: 1, name: "test" }]);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/owner/repo/issues",
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer token-123" }),
      }),
    );
  });

  it("appends query parameters to the URL", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    await githubGet("https://api.github.com/repos/owner/repo/issues", "token", {
      per_page: "50",
      state: "all",
      since: "2026-01-01T00:00:00Z",
    });

    const calledUrl = mockFetch.mock.calls[0]![0] as string;
    expect(calledUrl).toContain("per_page=50");
    expect(calledUrl).toContain("state=all");
    expect(calledUrl).toContain("since=2026-01-01T00%3A00%3A00Z");
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => "rate limited",
    });

    await expect(githubGet("https://api.github.com/repos/owner/repo/issues", "token")).rejects.toThrow(
      "GitHub API error 403",
    );
  });

  it("works without optional params", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => null,
    });

    const result = await githubGet<null>("https://api.github.com/repos/owner/repo/releases", "token");

    expect(result).toBeNull();
  });
});
