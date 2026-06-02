import { describe, expect, it } from "vitest";
import type { GitHubItem } from "../github/types";
import { buildSkillsPrompt } from "./build-skills-prompt";

const makeItem = (overrides: Partial<GitHubItem> = {}): GitHubItem => ({
  number: 1,
  title: "Skill PR",
  state: "open",
  user: { login: "dev" },
  labels: [],
  created_at: "2026-03-09T00:00:00Z",
  updated_at: "2026-03-09T12:00:00Z",
  comments: 10,
  reactions: { "+1": 5 },
  body: "A new skill",
  html_url: "https://github.com/anthropics/skills/pull/1",
  ...overrides,
});

describe("buildSkillsPrompt", () => {
  it("includes skills repository context", () => {
    const result = buildSkillsPrompt([makeItem()], [makeItem()], "2026-03-09", "zh-CN");
    expect(result).toContain("anthropics/skills");
    expect(result).toContain("Claude Code Skills");
  });

  it("generates English variant", () => {
    const result = buildSkillsPrompt([], [], "2026-03-09", "en-US");
    expect(result).toContain("Claude Code ecosystem");
    expect(result).toContain("None");
  });
});
