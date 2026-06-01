import { DateTime } from "luxon";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchRecentReleases } from "./fetch-recent-releases";
import type { GitHubRelease } from "./types";

const mockGithubGet = vi.fn();

vi.mock("./github-http", () => ({
  githubGet: mockGithubGet,
}));

const makeRelease = (tag: string, publishedAt: string): GitHubRelease => ({
  tag_name: tag,
  name: tag,
  body: `${tag} release notes`,
  published_at: publishedAt,
});

describe("fetchRecentReleases", () => {
  beforeEach(() => {
    mockGithubGet.mockReset();
  });

  it("returns releases published after the since date", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    const releases = [
      makeRelease("v1.0", "2026-04-01T00:00:00Z"),
      makeRelease("v2.0", "2026-05-15T00:00:00Z"),
      makeRelease("v3.0", "2026-06-01T00:00:00Z"),
    ];

    mockGithubGet.mockResolvedValue(releases);

    const result = await fetchRecentReleases("owner/repo", since, "token");

    expect(result).toHaveLength(2);
    expect(result[0]?.tag_name).toBe("v2.0");
    expect(result[1]?.tag_name).toBe("v3.0");
  });

  it("returns empty array when no releases match", async () => {
    const since = DateTime.fromISO("2026-06-01T00:00:00Z");

    mockGithubGet.mockResolvedValue([]);

    const result = await fetchRecentReleases("owner/repo", since, "token");

    expect(result).toEqual([]);
  });

  it("passes per_page=10 param to GitHub API", async () => {
    const since = DateTime.fromISO("2026-01-01T00:00:00Z");

    mockGithubGet.mockResolvedValue([]);

    await fetchRecentReleases("owner/repo", since, "token");

    expect(mockGithubGet).toHaveBeenCalledWith("https://api.github.com/repos/owner/repo/releases", "token", {
      per_page: "10",
    });
  });
});
