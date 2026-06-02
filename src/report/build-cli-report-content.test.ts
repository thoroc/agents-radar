import { describe, expect, it } from "vitest";
import type { RepoDigest } from "../prompts";
import { buildCliReportContent } from "./build-cli-report-content";

const makeDigest = (overrides: Partial<RepoDigest> = {}): RepoDigest => ({
  config: { id: "test-tool", repo: "org/test-tool", name: "TestTool" },
  issues: [],
  prs: [],
  releases: [],
  summary: "Test summary content",
  ...overrides,
});

describe("buildCliReportContent", () => {
  it("includes title, meta, and all sections (zh)", () => {
    const digests = [
      makeDigest({ config: { id: "claude-code", repo: "anthropics/claude-code", name: "Claude Code" } }),
      makeDigest({ config: { id: "codex", repo: "openai/codex", name: "OpenAI Codex" } }),
    ];
    const result = buildCliReportContent(
      digests,
      "Skills summary",
      "Comparison content",
      "2026-03-09 00:00",
      "2026-03-09",
      "\n---\nfooter",
      "anthropics/skills",
      "zh-CN",
    );
    expect(result).toContain("# AI CLI 工具社区动态日报 2026-03-09");
    expect(result).toContain("覆盖工具: 2 个");
    expect(result).toContain("[Claude Code](https://github.com/anthropics/claude-code)");
    expect(result).toContain("[Claude Code Skills](https://github.com/anthropics/skills)");
    expect(result).toContain("横向对比");
    expect(result).toContain("Comparison content");
    expect(result).toContain("Skills summary");
    expect(result).toContain("footer");
  });
  it("includes title and meta in English", () => {
    const digests = [makeDigest()];
    const result = buildCliReportContent(
      digests,
      "Skills",
      "Comparison",
      "2026-03-09 00:00",
      "2026-03-09",
      "",
      "anthropics/skills",
      "en-US",
    );
    expect(result).toContain("# AI CLI Tools Community Digest 2026-03-09");
    expect(result).toContain("Cross-Tool Comparison");
  });
  it("nests skills section inside claude-code details only", () => {
    const digests = [
      makeDigest({ config: { id: "claude-code", repo: "anthropics/claude-code", name: "Claude Code" } }),
      makeDigest({ config: { id: "codex", repo: "openai/codex", name: "Codex" } }),
    ];
    const result = buildCliReportContent(
      digests,
      "SKILLS_CONTENT",
      "comparison",
      "",
      "",
      "",
      "anthropics/skills",
      "zh-CN",
    );
    const claudeIdx = result.indexOf("Claude Code");
    const skillsIdx = result.indexOf("SKILLS_CONTENT");
    expect(skillsIdx).toBeGreaterThan(claudeIdx);
    expect(result.split("SKILLS_CONTENT")).toHaveLength(2);
  });
});
