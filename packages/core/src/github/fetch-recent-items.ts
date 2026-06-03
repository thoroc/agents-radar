import { DateTime } from "luxon";
import { env } from "../config/env";
import { githubGet } from "./github-http";
import type { GitHubItem, RepoConfig } from "./types";

const MAX_PAGES = 5;

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
  GITHUB_TOKEN: string = env.githubToken,
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
