import { describe, it, expect, afterEach } from "vitest";
import { buildMessage, type Highlights } from "../notify.ts";

const BASE_URL = "https://example.com/radar";

describe("buildMessage", () => {
  const origPagesUrl = process.env["PAGES_URL"];

  afterEach(() => {
    if (origPagesUrl !== undefined) {
      process.env["PAGES_URL"] = origPagesUrl;
    } else {
      delete process.env["PAGES_URL"];
    }
  });

  it("builds a daily message with zh-CN + en-US reports", () => {
    const msg = buildMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli.en-US", "ai-agents", "ai-agents.en-US"],
      BASE_URL,
    );
    expect(msg).toContain("agents-radar");
    expect(msg).toContain("2026-03-09");
    expect(msg).toContain("📡");
    // zh-CN links
    expect(msg).toContain(`${BASE_URL}/#2026-03-09/ai-cli`);
    expect(msg).toContain("AI CLI 工具");
    // en-US links
    expect(msg).toContain(`${BASE_URL}/#2026-03-09/ai-cli.en-US`);
    expect(msg).toContain("AI CLI Tools");
  });

  it("shows weekly icon and suffix for weekly reports", () => {
    const msg = buildMessage("2026-03-09", ["ai-weekly", "ai-weekly.en-US"], BASE_URL);
    expect(msg).toContain("📅");
    expect(msg).toContain("周报");
  });

  it("shows monthly icon and suffix for monthly reports", () => {
    const msg = buildMessage("2026-03-09", ["ai-monthly", "ai-monthly.en-US"], BASE_URL);
    expect(msg).toContain("📆");
    expect(msg).toContain("月报");
  });

  it("monthly takes priority over weekly", () => {
    const msg = buildMessage("2026-03-09", ["ai-weekly", "ai-monthly"], BASE_URL);
    expect(msg).toContain("📆");
    expect(msg).toContain("月报");
  });

  it("renders zh-CN-only reports without en-US link", () => {
    const msg = buildMessage("2026-03-09", ["ai-hn"], BASE_URL);
    expect(msg).toContain("HN 社区动态");
    expect(msg).not.toContain("HN Community");
  });

  it("includes Web UI and RSS links", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL);
    expect(msg).toContain("🌐 Web UI");
    expect(msg).toContain("RSS");
    expect(msg).toContain(`${BASE_URL}/feed.xml`);
  });

  it("strips trailing slash from pagesUrl", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL + "/");
    expect(msg).not.toContain("//feed.xml");
    expect(msg).toContain(`${BASE_URL}/feed.xml`);
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
    const msg = buildMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli.en-US", "ai-agents", "ai-agents.en-US"],
      BASE_URL,
      highlights,
    );
    expect(msg).toContain("◦ [zh-CN] Claude Code 发布 v1.2.0");
    expect(msg).toContain("◦ [zh-CN] Gemini CLI 修复 streaming");
    expect(msg).toContain("◦ OpenClaw 新增 MCP 支持");
    expect(msg).toContain("◦ [en-US] Claude Code releases v1.2.0");
  });

  it("omits language prefix when only one lang has highlights", () => {
    const highlights: Highlights = {
      "zh-CN": {
        "ai-cli": ["Claude Code 发布 v1.2.0"],
      },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli.en-US"], BASE_URL, highlights);
    expect(msg).toContain("◦ Claude Code 发布 v1.2.0");
    expect(msg).not.toContain("[zh-CN]");
  });

  it("supports 3+ languages in highlights", () => {
    const highlights: Highlights = {
      "zh-CN": { "ai-cli": ["中文摘要"] },
      "en-US": { "ai-cli": ["English summary"] },
      "ja-JP": { "ai-cli": ["日本語要約"] },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli.en-US", "ai-cli.ja-JP"], BASE_URL, highlights, [
      "zh-CN",
      "en-US",
      "ja-JP",
    ]);
    expect(msg).toContain("◦ [zh-CN] 中文摘要");
    expect(msg).toContain("◦ [en-US] English summary");
    expect(msg).toContain("◦ [ja-JP] 日本語要約");
  });

  it("uses enabledLangs[0] for suffix and footer", () => {
    const msg = buildMessage("2026-03-09", ["ai-weekly", "ai-weekly.en-US"], BASE_URL, null, [
      "en-US",
      "zh-CN",
    ]);
    expect(msg).toContain("agents-radar Weekly");
  });

  it("works without highlights (null)", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli.en-US"], BASE_URL, null);
    expect(msg).toContain("AI CLI 工具");
    expect(msg).not.toContain("◦");
  });

  it("works without highlights (undefined)", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli.en-US"], BASE_URL);
    expect(msg).toContain("AI CLI 工具");
    expect(msg).not.toContain("◦");
  });
});
