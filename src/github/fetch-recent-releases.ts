import { DateTime } from "luxon";
import { githubGet } from "./github-http";
import type { GitHubRelease } from "./types";

export const fetchRecentReleases = async (
  repo: string,
  since: DateTime,
  GITHUB_TOKEN: string = process.env.GITHUB_TOKEN ?? "",
): Promise<GitHubRelease[]> => {
  const releases = await githubGet<GitHubRelease[]>(
    `https://api.github.com/repos/${repo}/releases`,
    GITHUB_TOKEN,
    { per_page: "10" },
  );
  return releases.filter((r) => DateTime.fromISO(r.published_at).toMillis() >= since.toMillis());
};
