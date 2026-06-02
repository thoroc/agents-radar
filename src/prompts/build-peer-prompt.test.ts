import { describe, expect, it } from "vitest";
import type { GitHubItem, GitHubRelease, RepoConfig } from "../github/types";
import { buildPeerPrompt } from "./build-peer-prompt";

const cfg: RepoConfig = { id: "test", repo: "org/test", name: "TestTool" };

const makeItem = (overrides: Partial<GitHubItem> = {}): GitHubItem => ({
  number: 1,
  title: "Issue",
  state: "open",
  user: { login: "alice" },
  labels: [],
  created_at: "2026-03-09T00:00:00Z",
  updated_at: "2026-03-09T12:00:00Z",
  comments: 5,
  reactions: { "+1": 2 },
  body: "body",
  html_url: "https://github.com/org/test/issues/1",
  ...overrides,
});

const release: GitHubRelease = {
  tag_name: "v1.0.0",
  name: "Release 1.0",
  body: "Release notes",
  published_at: "2026-03-09T00:00:00Z",
};

describe("buildPeerPrompt", () => {
  it("includes data overview section (default zh)", () => {
    const issues = [makeItem({ state: "open" }), makeItem({ state: "closed" })];
    const result = buildPeerPrompt(cfg, issues, [makeItem()], [release], "2026-03-09");
    expect(result).toContain("Data Overview");
    expect(result).toContain("open/active: 1");
    expect(result).toContain("closed: 1");
    expect(result).toContain("Write the response in Chinese.");
  });

  it("generates English prompt", () => {
    const result = buildPeerPrompt(cfg, [], [], [], "2026-03-09", 30, 20, "en");
    expect(result).toContain("Data Overview");
    expect(result).toContain("None");
    expect(result).toContain("Write the response in English.");
  });
});
