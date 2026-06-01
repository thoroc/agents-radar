import { describe, expect, it } from "vitest";
import type { GitHubItem, GitHubRelease, RepoConfig } from "../github";
import { buildCliPrompt } from "./build-cli-prompt";
import { buildComparisonPrompt } from "./build-comparison-prompt";
import { buildPeerPrompt } from "./build-peer-prompt";
import { buildPeersComparisonPrompt } from "./build-peers-comparison-prompt";
import { buildSkillsPrompt } from "./build-skills-prompt";
import { formatItem } from "./format-item";
import type { RepoDigest } from "./repo-digest";
import { sampleNote } from "./sample-note";
import { topN } from "./top-n";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

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

const makeDigest = (overrides: Partial<RepoDigest> = {}): RepoDigest => ({
  config: cfg,
  issues: [],
  prs: [],
  releases: [],
  summary: "Summary",
  ...overrides,
});

// ---------------------------------------------------------------------------
// buildCliPrompt
// ---------------------------------------------------------------------------

describe("buildCliPrompt", () => {
  it("generates Chinese prompt by default", () => {
    const result = buildCliPrompt(cfg, [makeItem()], [makeItem()], [release], "2026-03-09");
    expect(result).toContain("技术分析师");
    expect(result).toContain("TestTool");
    expect(result).toContain("2026-03-09");
    expect(result).toContain("org/test");
    expect(result).toContain("v1.0.0");
  });

  it("generates English prompt", () => {
    const result = buildCliPrompt(cfg, [makeItem()], [], [], "2026-03-09", "en");
    expect(result).toContain("technical analyst");
    expect(result).toContain("TestTool");
    expect(result).toContain("Hot Issues");
  });

  it("shows 无 when no data", () => {
    const result = buildCliPrompt(cfg, [], [], [], "2026-03-09");
    expect(result).toContain("无");
  });

  it("includes sample notes when items exceed limit", () => {
    const items = Array.from({ length: 50 }, (_, i) => makeItem({ number: i, comments: i }));
    const result = buildCliPrompt(cfg, items, [], [], "2026-03-09");
    expect(result).toContain("共 50 条");
    expect(result).toContain("30 条");
  });
});

// ---------------------------------------------------------------------------
// buildPeerPrompt
// ---------------------------------------------------------------------------

describe("buildPeerPrompt", () => {
  it("includes data overview section", () => {
    const issues = [makeItem({ state: "open" }), makeItem({ state: "closed" })];
    const result = buildPeerPrompt(cfg, issues, [makeItem()], [release], "2026-03-09");
    expect(result).toContain("数据概览");
    expect(result).toContain("新开/活跃: 1");
    expect(result).toContain("已关闭: 1");
  });

  it("generates English prompt", () => {
    const result = buildPeerPrompt(cfg, [], [], [], "2026-03-09", 30, 20, "en");
    expect(result).toContain("Data Overview");
    expect(result).toContain("None");
  });
});

// ---------------------------------------------------------------------------
// buildComparisonPrompt
// ---------------------------------------------------------------------------

describe("buildComparisonPrompt", () => {
  it("includes all digest summaries when they have data", () => {
    const digests = [
      makeDigest({ config: { ...cfg, name: "Tool A" }, summary: "Summary A", issues: [makeItem()] }),
      makeDigest({ config: { ...cfg, name: "Tool B" }, summary: "Summary B", prs: [makeItem()] }),
    ];
    const result = buildComparisonPrompt(digests, "2026-03-09");
    expect(result).toContain("Tool A");
    expect(result).toContain("Summary A");
    expect(result).toContain("Tool B");
    expect(result).toContain("Summary B");
  });

  it("shows no-activity for empty digests", () => {
    const digests = [makeDigest({ summary: "Summary" })];
    const result = buildComparisonPrompt(digests, "2026-03-09");
    expect(result).toContain("过去24小时无活动");
  });
});

// ---------------------------------------------------------------------------
// buildPeersComparisonPrompt
// ---------------------------------------------------------------------------

describe("buildPeersComparisonPrompt", () => {
  it("includes openclaw and peer sections", () => {
    const openclawDigest = makeDigest({
      config: { id: "openclaw", repo: "openclaw/openclaw", name: "OpenClaw" },
      summary: "OC summary",
    });
    const peerDigests = [
      makeDigest({ config: { ...cfg, name: "Peer" }, summary: "Peer summary", issues: [makeItem()] }),
    ];
    const result = buildPeersComparisonPrompt(openclawDigest, peerDigests, "2026-03-09");
    expect(result).toContain("OpenClaw（核心参照");
    expect(result).toContain("OC summary");
    expect(result).toContain("Peer summary");
  });
});

// ---------------------------------------------------------------------------
// buildSkillsPrompt
// ---------------------------------------------------------------------------

describe("buildSkillsPrompt", () => {
  it("includes skills repository context", () => {
    const result = buildSkillsPrompt([makeItem()], [makeItem()], "2026-03-09");
    expect(result).toContain("anthropics/skills");
    expect(result).toContain("Claude Code Skills");
  });

  it("generates English variant", () => {
    const result = buildSkillsPrompt([], [], "2026-03-09", "en");
    expect(result).toContain("Claude Code ecosystem");
    expect(result).toContain("None");
  });
});

// ---------------------------------------------------------------------------
// formatItem
// ---------------------------------------------------------------------------

describe("formatItem", () => {
  it("formats a basic item in Chinese (default)", () => {
    const result = formatItem(makeItem());
    expect(result).toContain("#1 [OPEN]");
    expect(result).toContain("Issue");
    expect(result).toContain("作者: alice");
    expect(result).toContain("评论: 5");
    expect(result).toContain("👍: 2");
    expect(result).toContain("链接: org/test Issue #1");
    expect(result).toContain("摘要: body");
  });

  it("formats an item in English", () => {
    const result = formatItem(makeItem(), "en");
    expect(result).toContain("Author: alice");
    expect(result).toContain("Comments: 5");
    expect(result).toContain("URL:");
    expect(result).toContain("Summary: body");
  });

  it("includes labels when present", () => {
    const item = makeItem({ labels: [{ name: "bug" }, { name: "critical" }] });
    const result = formatItem(item);
    expect(result).toContain("[bug, critical]");
  });

  it("shows no label bracket when labels empty", () => {
    const result = formatItem(makeItem({ labels: [] }));
    expect(result).toContain("#1 [OPEN] Issue");
    expect(result).not.toContain("[]");
  });

  it("truncates body at 300 chars with ellipsis", () => {
    const longBody = "A".repeat(400);
    const result = formatItem(makeItem({ body: longBody }));
    expect(result).toContain(`${"A".repeat(300)}...`);
  });

  it("does not add ellipsis for body <= 300 chars", () => {
    const result = formatItem(makeItem({ body: "Short body" }));
    expect(result).toContain("Short body");
    expect(result).not.toContain("...");
  });

  it("handles null body gracefully", () => {
    const result = formatItem(makeItem({ body: null }));
    expect(result).toContain("摘要: ");
  });

  it("handles missing reactions gracefully", () => {
    const result = formatItem(makeItem({ reactions: undefined }));
    expect(result).toContain("👍: 0");
  });

  it("replaces newlines in body with spaces", () => {
    const result = formatItem(makeItem({ body: "line1\nline2\nline3" }));
    expect(result).toContain("line1 line2 line3");
  });

  it("shows closed state uppercase", () => {
    const result = formatItem(makeItem({ state: "closed" }));
    expect(result).toContain("[CLOSED]");
  });
});

// ---------------------------------------------------------------------------
// topN
// ---------------------------------------------------------------------------

describe("topN", () => {
  it("returns top N items sorted by comment count desc", () => {
    const items = [
      makeItem({ number: 1, comments: 2 }),
      makeItem({ number: 2, comments: 10 }),
      makeItem({ number: 3, comments: 5 }),
      makeItem({ number: 4, comments: 8 }),
    ];
    const result = topN(items, 2);
    expect(result).toHaveLength(2);
    expect(result[0]!.number).toBe(2);
    expect(result[1]!.number).toBe(4);
  });

  it("returns all items if n >= items.length", () => {
    const items = [makeItem({ comments: 1 }), makeItem({ comments: 2 })];
    expect(topN(items, 5)).toHaveLength(2);
  });

  it("does not mutate the original array", () => {
    const items = [makeItem({ comments: 1 }), makeItem({ comments: 5 })];
    const original = [...items];
    topN(items, 1);
    expect(items[0]!.comments).toBe(original[0]!.comments);
    expect(items[1]!.comments).toBe(original[1]!.comments);
  });

  it("returns empty array for empty input", () => {
    expect(topN([], 3)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// sampleNote
// ---------------------------------------------------------------------------

describe("sampleNote", () => {
  it("shows sampled note in Chinese when total > sampled", () => {
    const result = sampleNote(100, 30);
    expect(result).toBe("（共 100 条，以下展示评论数最多的 30 条）");
  });

  it("shows total-only note in Chinese when total <= sampled", () => {
    expect(sampleNote(10, 10)).toBe("（共 10 条）");
    expect(sampleNote(5, 10)).toBe("（共 5 条）");
  });

  it("shows sampled note in English when total > sampled", () => {
    const result = sampleNote(50, 20, "en");
    expect(result).toBe("(Total: 50 items; showing top 20 by comment count)");
  });

  it("shows total-only note in English when total <= sampled", () => {
    expect(sampleNote(8, 8, "en")).toBe("(Total: 8 items)");
  });
});
