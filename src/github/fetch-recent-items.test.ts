import { DateTime } from "luxon";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchRecentItems } from "./fetch-recent-items";
import type { GitHubItem, RepoConfig } from "./types";

const mockGithubGet = vi.fn();

vi.mock("./github-http", () => ({
  githubGet: mockGithubGet,
}));

const testRepo: RepoConfig = { id: "test", repo: "owner/repo", name: "Test Repo" };

const makeItem = (number: number, updatedAt: string, overrides: Partial<GitHubItem> = {}): GitHubItem => ({
  number,
  title: `Item ${number}`,
  state: "open",
  user: { login: "user1" },
  labels: [],
  created_at: updatedAt,
  updated_at: updatedAt,
  comments: 0,
  html_url: `https://github.com/owner/repo/issues/${number}`,
  ...overrides,
});

describe("fetchRecentItems", () => {
  beforeEach(() => {
    mockGithubGet.mockReset();
  });

  it("fetches non-paginated issues", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    const items = [makeItem(1, "2026-05-02T00:00:00Z")];

    mockGithubGet.mockResolvedValue(items);

    const result = await fetchRecentItems(testRepo, "issues", since, "token");

    expect(result).toEqual(items);
    expect(mockGithubGet).toHaveBeenCalledWith(
      "https://api.github.com/repos/owner/repo/issues",
      "token",
      expect.objectContaining({ since: "2026-05-01T00:00:00.000+00:00", per_page: "50" }),
    );
  });

  it("filters non-paginated PRs by updated_at", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    const items = [
      makeItem(1, "2026-04-01T00:00:00Z", { pull_request: {} }),
      makeItem(2, "2026-05-15T00:00:00Z", { pull_request: {} }),
    ];

    mockGithubGet.mockResolvedValue(items);

    const result = await fetchRecentItems({ ...testRepo, paginated: false }, "pulls", since, "token");

    expect(result).toHaveLength(1);
    expect(result[0]?.number).toBe(2);
  });

  it("paginates through multiple pages of issues", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    const page1 = Array.from({ length: 100 }, (_, i) => makeItem(i + 1, "2026-05-02T00:00:00Z"));
    const page2 = [makeItem(101, "2026-05-01T12:00:00Z")];

    mockGithubGet.mockResolvedValueOnce(page1);
    mockGithubGet.mockResolvedValueOnce(page2);

    const result = await fetchRecentItems({ ...testRepo, paginated: true }, "issues", since, "token");

    expect(result).toHaveLength(101);
    expect(mockGithubGet).toHaveBeenCalledTimes(2);
  });

  it("stops pagination when items are older than since", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    const page1 = [makeItem(1, "2026-04-01T00:00:00Z")];

    mockGithubGet.mockResolvedValue(page1);

    const result = await fetchRecentItems({ ...testRepo, paginated: true }, "issues", since, "token");

    expect(result).toHaveLength(1);
    expect(mockGithubGet).toHaveBeenCalledTimes(1);
  });

  it("stops pagination when page has fewer than 100 items", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    const items = [makeItem(1, "2026-05-15T00:00:00Z")];

    mockGithubGet.mockResolvedValue(items);

    const result = await fetchRecentItems({ ...testRepo, paginated: true }, "issues", since, "token");

    expect(result).toHaveLength(1);
    expect(mockGithubGet).toHaveBeenCalledTimes(1);
  });
});
