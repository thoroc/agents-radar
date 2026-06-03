import { env } from "../config/env";
import { githubGet } from "./github-http";
import type { GitHubItem } from "./types";

export const fetchSkillsData = async (
  repo: string,
  GITHUB_TOKEN: string = env.githubToken,
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
