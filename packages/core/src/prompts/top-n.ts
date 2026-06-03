import type { GitHubItem } from "../github/types";

export const topN = (items: GitHubItem[], n: number): GitHubItem[] => {
  return [...items].sort((a, b) => b.comments - a.comments).slice(0, n);
};
