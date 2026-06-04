import type { RepoConfig } from "@agents-radar/config";

export type { RepoConfig };

export interface GitHubUser {
  login: string;
}

export interface GitHubLabel {
  name: string;
}

export interface GitHubReactions {
  "+1": number;
}

export interface GitHubItem {
  number: number;
  title: string;
  state: string;
  user: GitHubUser;
  labels: GitHubLabel[];
  created_at: string;
  updated_at: string;
  comments: number;
  reactions?: GitHubReactions;
  body?: string | null;
  html_url: string;
  pull_request?: unknown;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body?: string | null;
  published_at: string;
}

export interface RepoFetch {
  cfg: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
}
