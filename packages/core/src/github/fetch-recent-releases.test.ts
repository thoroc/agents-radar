import { DateTime } from "luxon";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchRecentReleases } from "./fetch-recent-releases";
import * as githubHttpModule from "./http";
import type { GitHubRelease } from "./types";

const makeRelease = (tag: string, publishedAt: string): GitHubRelease => ({
  tag_name: tag,
  name: tag,
  body: `${tag} release notes`,
  published_at: publishedAt,
});

describe("fetchRecentReleases", () => {
  let githubGetSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    githubGetSpy = vi.spyOn(githubHttpModule, "githubGet").mockResolvedValue([]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches releases since a given date", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    const releases = [makeRelease("v1.0", "2026-05-15T00:00:00Z")];

    githubGetSpy.mockResolvedValue(releases);

    const result = await fetchRecentReleases("owner/repo", since, "token");

    expect(result).toEqual(releases);
    expect(githubGetSpy).toHaveBeenCalledWith(
      "https://api.github.com/repos/owner/repo/releases",
      "token",
      expect.objectContaining({ per_page: "10" }),
    );
  });

  it("filters out releases older than since", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    const releases = [
      makeRelease("v0.9", "2026-04-01T00:00:00Z"),
      makeRelease("v1.0", "2026-05-15T00:00:00Z"),
    ];

    githubGetSpy.mockResolvedValue(releases);

    const result = await fetchRecentReleases("owner/repo", since, "token");

    expect(result).toHaveLength(1);
    expect(result[0]?.tag_name).toBe("v1.0");
  });

  it("returns empty array when no releases", async () => {
    const since = DateTime.fromISO("2026-05-01T00:00:00Z");
    githubGetSpy.mockResolvedValue([]);

    const result = await fetchRecentReleases("owner/repo", since, "token");

    expect(result).toEqual([]);
  });
});
