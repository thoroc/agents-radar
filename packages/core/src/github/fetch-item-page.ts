import { DateTime } from "luxon";
import { githubGet } from "./http";
import type { GitHubItem } from "./types";

export const fetchItemPage = async (
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
