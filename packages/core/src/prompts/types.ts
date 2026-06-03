import type { GitHubItem, GitHubRelease, RepoConfig } from "../github";

export interface RepoDigest {
  config: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
  summary: string;
}

export interface ReportHighlights {
  [reportId: string]: string[];
}
