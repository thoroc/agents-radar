import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchSkillsData } from "./fetch-skills-data";
import type { GitHubItem } from "./types";

const mockGithubGet = vi.fn();

vi.mock("./github-http", () => ({
  githubGet: mockGithubGet,
}));

const makeItem = (number: number, overrides: Partial<GitHubItem> = {}): GitHubItem => ({
  number,
  title: `Item ${number}`,
  state: "open",
  user: { login: `user${number}` },
  labels: [],
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  comments: 0,
  html_url: `https://github.com/owner/repo/issues/${number}`,
  ...overrides,
});

describe("fetchSkillsData", () => {
  beforeEach(() => {
    mockGithubGet.mockReset();
  });

  it("fetches PRs and issues separately", async () => {
    const prs = [makeItem(1, { pull_request: {} })];
    const issues = [makeItem(2), makeItem(3)];

    mockGithubGet.mockResolvedValueOnce(prs);
    mockGithubGet.mockResolvedValueOnce(issues);

    const result = await fetchSkillsData("owner/repo", "token");

    expect(result.prs).toHaveLength(1);
    expect(result.issues).toHaveLength(2);
  });

  it("filters out pull requests from issues array", async () => {
    const prs: GitHubItem[] = [];
    const issues = [makeItem(1), makeItem(2, { pull_request: {} }), makeItem(3)];

    mockGithubGet.mockResolvedValueOnce(prs);
    mockGithubGet.mockResolvedValueOnce(issues);

    const result = await fetchSkillsData("owner/repo", "token");

    expect(result.prs).toHaveLength(0);
    expect(result.issues).toHaveLength(2);
    expect(result.issues.every((i) => !i.pull_request)).toBe(true);
  });

  it("makes API calls with correct parameters", async () => {
    mockGithubGet.mockResolvedValueOnce([]);
    mockGithubGet.mockResolvedValueOnce([]);

    await fetchSkillsData("custom/repo", "token");

    expect(mockGithubGet).toHaveBeenCalledWith(
      "https://api.github.com/repos/custom/repo/pulls",
      "token",
      expect.objectContaining({ state: "open", per_page: "50" }),
    );
    expect(mockGithubGet).toHaveBeenCalledWith(
      "https://api.github.com/repos/custom/repo/issues",
      "token",
      expect.objectContaining({ state: "all", per_page: "50" }),
    );
  });
});
