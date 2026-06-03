import { DateTime } from "luxon";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchItemPage } from "./fetch-item-page";
import * as httpModule from "./http";
import type { GitHubItem } from "./types";

const makeItem = (number: number, updatedAt: string): GitHubItem => ({
  number,
  title: `Item ${number}`,
  state: "open",
  user: { login: "user1" },
  labels: [],
  created_at: updatedAt,
  updated_at: updatedAt,
  comments: 0,
  html_url: `https://github.com/owner/repo/issues/${number}`,
});

describe("fetchItemPage", () => {
  let githubGetSpy: ReturnType<typeof vi.spyOn>;
  const since = DateTime.fromISO("2026-01-01T00:00:00Z");

  beforeEach(() => {
    vi.clearAllMocks();
    githubGetSpy = vi.spyOn(httpModule, "githubGet").mockResolvedValue([]);
  });

  afterEach(() => vi.restoreAllMocks());

  it("passes since param for issues", async () => {
    await fetchItemPage("owner/repo", "issues", since, 1, "tok");
    const [, , params] = githubGetSpy.mock.calls[0]!;
    expect((params as Record<string, string>).since).toBe(since.toISO());
  });

  it("does not pass since param for pulls", async () => {
    await fetchItemPage("owner/repo", "pulls", since, 1, "tok");
    const [, , params] = githubGetSpy.mock.calls[0]!;
    expect((params as Record<string, string>).since).toBeUndefined();
  });

  it("filters pull requests older than since", async () => {
    const old = makeItem(1, "2025-12-31T00:00:00Z");
    const recent = makeItem(2, "2026-01-02T00:00:00Z");
    githubGetSpy.mockResolvedValue([old, recent]);
    const result = await fetchItemPage("owner/repo", "pulls", since, 1, "tok");
    expect(result).toEqual([recent]);
  });

  it("does not filter issues by date", async () => {
    const old = makeItem(1, "2025-12-31T00:00:00Z");
    githubGetSpy.mockResolvedValue([old]);
    const result = await fetchItemPage("owner/repo", "issues", since, 1, "tok");
    expect(result).toEqual([old]);
  });
});
