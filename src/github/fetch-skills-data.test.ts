import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchSkillsData } from "./fetch-skills-data";
import * as githubHttpModule from "./github-http";
import type { GitHubItem } from "./types";

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
  let githubGetSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    githubGetSpy = vi.spyOn(githubHttpModule, "githubGet").mockResolvedValue([]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches issues and returns formatted result", async () => {
    const issues = [makeItem(1, { title: "Skill: Test", state: "open" })];

    githubGetSpy.mockResolvedValue(issues);

    const result = await fetchSkillsData("anthropics/skills", "token");

    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]?.title).toBe("Skill: Test");
  });

  it("handles empty issues list", async () => {
    githubGetSpy.mockResolvedValue([]);

    const result = await fetchSkillsData("anthropics/skills", "token");

    expect(result.issues).toEqual([]);
    expect(result.prs).toEqual([]);
  });
});
