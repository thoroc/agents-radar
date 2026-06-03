import { describe, expect, it } from "vitest";
import type { GitHubItem, GitHubRelease, RepoConfig } from "../github/types";
import { buildCliPrompt } from "./cli";

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

describe("buildCliPrompt", () => {
  it("generates prompt by default", () => {
    const result = buildCliPrompt(cfg, [makeItem()], [makeItem()], [release], "2026-03-09", "zh-CN");
    expect(result).toContain("technical analyst");
    expect(result).toContain("TestTool");
    expect(result).toContain("2026-03-09");
    expect(result).toContain("org/test");
    expect(result).toContain("v1.0.0");
    expect(result).toContain("Write the response in Chinese");
  });

  it("generates English prompt", () => {
    const result = buildCliPrompt(cfg, [makeItem()], [], [], "2026-03-09", "en-US");
    expect(result).toContain("technical analyst");
    expect(result).toContain("TestTool");
    expect(result).toContain("Hot Issues");
    expect(result).toContain("Write the response in English");
  });

  it("shows None when no data", () => {
    const result = buildCliPrompt(cfg, [], [], [], "2026-03-09", "zh-CN");
    expect(result).toContain("None");
  });

  it("includes sample notes when items exceed limit", () => {
    const items = Array.from({ length: 50 }, (_, i) => makeItem({ number: i, comments: i }));
    const result = buildCliPrompt(cfg, items, [], [], "2026-03-09", "zh-CN");
    expect(result).toContain("共 50 条");
    expect(result).toContain("30 条");
  });
});
