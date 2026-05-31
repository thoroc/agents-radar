import { DateTime } from "luxon";
import type { GitHubItem, GitHubRelease, RepoConfig } from "./types";

const MAX_PAGES = 5;

const headers = (token: string): Record<string, string> => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

const githubGet = async <T>(url: string, token: string, params: Record<string, string> = {}): Promise<T> => {
  const u = new URL(url);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
  const resp = await fetch(u.toString(), { headers: headers(token) });
  if (!resp.ok) throw new Error(`GitHub API error ${resp.status} (${url}): ${await resp.text()}`);
  return resp.json() as Promise<T>;
};

const fetchItemPage = async (
  repo: string,
  itemType: "issues" | "pulls",
  since: DateTime,
  page: number,
  token: string,
): Promise<GitHubItem[]> => {
  const params: Record<string, string> = {
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: "100",
    page: String(page),
  };
  if (itemType === "issues") params.since = since.toISO() ?? "";

  const items = await githubGet<GitHubItem[]>(
    `https://api.github.com/repos/${repo}/${itemType}`,
    token,
    params,
  );
  return itemType === "pulls"
    ? items.filter((i) => DateTime.fromISO(i.updated_at).toMillis() >= since.toMillis())
    : items;
};

export const fetchRecentItems = async (
  cfg: RepoConfig,
  itemType: "issues" | "pulls",
  since: DateTime,
  GITHUB_TOKEN: string = process.env.GITHUB_TOKEN ?? "",
): Promise<GitHubItem[]> => {
  if (!cfg.paginated) {
    const params: Record<string, string> = {
      state: "all",
      sort: "updated",
      direction: "desc",
      per_page: "50",
    };
    if (itemType === "issues") params.since = since.toISO() ?? "";
    const items = await githubGet<GitHubItem[]>(
      `https://api.github.com/repos/${cfg.repo}/${itemType}`,
      GITHUB_TOKEN,
      params,
    );
    return itemType === "pulls"
      ? items.filter((i) => DateTime.fromISO(i.updated_at).toMillis() >= since.toMillis())
      : items;
  }

  const all: GitHubItem[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const items = await fetchItemPage(cfg.repo, itemType, since, page, GITHUB_TOKEN);
    if (items.length === 0) break;
    all.push(...items);
    const last = items[items.length - 1];
    if (last && DateTime.fromISO(last.updated_at).toMillis() < since.toMillis()) break;
    if (items.length < 100) break;
  }
  return all;
};

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

export const fetchSkillsData = async (
  repo: string,
  GITHUB_TOKEN: string = process.env.GITHUB_TOKEN ?? "",
): Promise<{ prs: GitHubItem[]; issues: GitHubItem[] }> => {
  const [prs, issuesRaw] = await Promise.all([
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/pulls`, GITHUB_TOKEN, {
      state: "open",
      sort: "popularity",
      direction: "desc",
      per_page: "50",
    }),
    githubGet<GitHubItem[]>(`https://api.github.com/repos/${repo}/issues`, GITHUB_TOKEN, {
      state: "all",
      sort: "comments",
      direction: "desc",
      per_page: "50",
    }),
  ]);
  return { prs, issues: issuesRaw.filter((i) => !i.pull_request) };
};
