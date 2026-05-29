import { describe, it, expect, afterEach } from "vitest";
import { buildFeishuMessage } from "../feishu";
import type { Highlights } from "../notify";

const BASE_URL = "https://example.com/radar";

describe("buildFeishuMessage", () => {
  const origPagesUrl = process.env["PAGES_URL"];

  afterEach(() => {
    if (origPagesUrl !== undefined) {
      process.env["PAGES_URL"] = origPagesUrl;
    } else {
      delete process.env["PAGES_URL"];
    }
  });

  it("builds a daily message with zh-CN + en-US reports", () => {
    const { title, content } = buildFeishuMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli.en-US", "ai-agents", "ai-agents.en-US"],
      BASE_URL,
    );
    expect(title).toContain("agents-radar");
    expect(title).toContain("2026-03-09");
    expect(title).toContain("📡");
    expect(content).toContain(`[AI CLI 工具](${BASE_URL}/#2026-03-09/ai-cli)`);
    expect(content).toContain(`[AI CLI Tools](${BASE_URL}/#2026-03-09/ai-cli.en-US)`);
  });

  it("shows weekly icon and suffix for weekly reports", () => {
    const { content } = buildFeishuMessage("2026-03-09", ["ai-weekly", "ai-weekly.en-US"], BASE_URL);
    expect(content).toContain("📅");
    expect(content).toContain("周报");
  });

  it("shows monthly icon and suffix for monthly reports", () => {
    const { content } = buildFeishuMessage("2026-03-09", ["ai-monthly", "ai-monthly.en-US"], BASE_URL);
    expect(content).toContain("📆");
    expect(content).toContain("月报");
  });

  it("monthly takes priority over weekly", () => {
    const { content } = buildFeishuMessage("2026-03-09", ["ai-weekly", "ai-monthly"], BASE_URL);
    expect(content).toContain("📆");
    expect(content).toContain("月报");
  });

  it("renders zh-CN-only reports without en-US link", () => {
    const { content } = buildFeishuMessage("2026-03-09", ["ai-hn"], BASE_URL);
    expect(content).toContain("HN 社区动态");
    expect(content).not.toContain("HN Community");
  });

  it("includes Web UI and RSS links", () => {
    const { content } = buildFeishuMessage("2026-03-09", ["ai-cli"], BASE_URL);
    expect(content).toContain("🌐 Web UI");
    expect(content).toContain("RSS");
    expect(content).toContain(`${BASE_URL}/feed.xml`);
  });

  it("uses markdown links instead of HTML", () => {
    const { content } = buildFeishuMessage("2026-03-09", ["ai-cli", "ai-cli.en-US"], BASE_URL);
    expect(content).not.toContain("<a href=");
    expect(content).not.toContain("<b>");
    expect(content).toContain("**agents-radar");
    expect(content).toContain(`[AI CLI 工具](`);
  });

  it("includes highlights when provided", () => {
    const highlights: Highlights = {
      "zh-CN": {
        "ai-cli": ["Claude Code 发布 v1.2.0", "Gemini CLI 修复 streaming"],
        "ai-agents": ["OpenClaw 新增 MCP 支持"],
      },
      "en-US": {
        "ai-cli": ["Claude Code releases v1.2.0"],
      },
    };
    const { content } = buildFeishuMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli.en-US", "ai-agents", "ai-agents.en-US"],
      BASE_URL,
      highlights,
    );
    expect(content).toContain("◦ [zh-CN] Claude Code 发布 v1.2.0");
    expect(content).toContain("◦ [zh-CN] Gemini CLI 修复 streaming");
    expect(content).toContain("◦ OpenClaw 新增 MCP 支持");
    expect(content).toContain("◦ [en-US] Claude Code releases v1.2.0");
  });

  it("omits language prefix when only one lang has highlights", () => {
    const highlights: Highlights = {
      "zh-CN": {
        "ai-cli": ["Claude Code 发布 v1.2.0"],
      },
    };
    const { content } = buildFeishuMessage("2026-03-09", ["ai-cli", "ai-cli.en-US"], BASE_URL, highlights);
    expect(content).toContain("◦ Claude Code 发布 v1.2.0");
    expect(content).not.toContain("[zh-CN]");
  });

  it("supports 3+ languages in highlights", () => {
    const highlights: Highlights = {
      "zh-CN": { "ai-cli": ["中文摘要"] },
      "en-US": { "ai-cli": ["English summary"] },
      "ja-JP": { "ai-cli": ["日本語要約"] },
    };
    const { content } = buildFeishuMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli.en-US", "ai-cli.ja-JP"],
      BASE_URL,
      highlights,
      ["zh-CN", "en-US", "ja-JP"],
    );
    expect(content).toContain("◦ [zh-CN] 中文摘要");
    expect(content).toContain("◦ [en-US] English summary");
    expect(content).toContain("◦ [ja-JP] 日本語要約");
  });

  it("uses enabledLangs[0] for suffix and footer", () => {
    const { content } = buildFeishuMessage("2026-03-09", ["ai-weekly", "ai-weekly.en-US"], BASE_URL, null, [
      "en-US",
      "zh-CN",
    ]);
    expect(content).toContain("agents-radar Weekly");
  });

  it("works without highlights", () => {
    const { content } = buildFeishuMessage("2026-03-09", ["ai-cli", "ai-cli.en-US"], BASE_URL, null);
    expect(content).toContain("AI CLI 工具");
    expect(content).not.toContain("◦");
  });
});
