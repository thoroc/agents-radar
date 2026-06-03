import { afterEach, describe, expect, it } from "vitest";
import type { Highlights } from "../notify";
import { buildFeishuMessage } from "./build-feishu-message";

const BASE_URL = "https://example.com/radar";

describe("buildFeishuMessage", () => {
  const origPagesUrl = process.env.PAGES_URL;

  afterEach(() => {
    if (origPagesUrl !== undefined) {
      process.env.PAGES_URL = origPagesUrl;
    } else {
      delete process.env.PAGES_URL;
    }
  });

  it("builds a daily message with zh + en reports", () => {
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-cli", "ai-agents"],
      pagesUrl: BASE_URL,
      enabledLangs: ["zh-CN", "en-US"],
    });
    expect(msg).toContain("agents-radar");
    expect(msg).toContain("2026-03-09");
    expect(msg).toContain("📡");
    expect(msg).toContain(`[AI CLI 工具 (ZH-CN)](${BASE_URL}/#2026-03-09/ai-cli.zh-CN)`);
    expect(msg).toContain(`[AI CLI Tools (EN-US)](${BASE_URL}/#2026-03-09/ai-cli)`);
  });

  it("shows weekly icon and suffix for weekly reports", () => {
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-weekly"],
      pagesUrl: BASE_URL,
      enabledLangs: ["zh-CN"],
      primaryLang: "zh-CN",
    });
    expect(msg).toContain("📅");
    expect(msg).toContain("周报");
  });

  it("shows monthly icon and suffix for monthly reports", () => {
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-monthly"],
      pagesUrl: BASE_URL,
      enabledLangs: ["zh-CN"],
      primaryLang: "zh-CN",
    });
    expect(msg).toContain("📆");
    expect(msg).toContain("月报");
  });

  it("monthly takes priority over weekly", () => {
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-weekly", "ai-monthly"],
      pagesUrl: BASE_URL,
      enabledLangs: ["zh-CN"],
      primaryLang: "zh-CN",
    });
    expect(msg).toContain("📆");
    expect(msg).toContain("月报");
  });

  it("renders zh-only reports without en link", () => {
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-hn"],
      pagesUrl: BASE_URL,
      enabledLangs: ["zh-CN"],
      primaryLang: "zh-CN",
    });
    expect(msg).toContain("HN 社区动态");
    expect(msg).not.toContain("HN Community");
  });

  it("includes Web UI and RSS links", () => {
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-cli"],
      pagesUrl: BASE_URL,
      enabledLangs: ["zh-CN"],
      primaryLang: "zh-CN",
    });
    expect(msg).toContain("网页端");
    expect(msg).toContain("RSS");
  });

  it("uses markdown links instead of HTML", () => {
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-cli"],
      pagesUrl: BASE_URL,
      enabledLangs: ["zh-CN"],
      primaryLang: "zh-CN",
    });
    expect(msg).not.toContain("<a href=");
    expect(msg).not.toContain("<b>");
    expect(msg).toContain("**agents-radar");
    expect(msg).toContain(`[AI CLI 工具](`);
  });

  it("includes highlights when provided", () => {
    const highlights: Highlights = {
      "en-US": {
        "ai-cli": ["Claude Code 发布 v1.2.0", "Gemini CLI 修复 streaming"],
        "ai-agents": ["OpenClaw 新增 MCP 支持"],
      },
    };
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-cli", "ai-agents"],
      pagesUrl: BASE_URL,
      highlights,
      enabledLangs: ["zh-CN", "en-US"],
    });
    expect(msg).toContain("◦ Claude Code 发布 v1.2.0");
    expect(msg).toContain("◦ Gemini CLI 修复 streaming");
    expect(msg).toContain("◦ OpenClaw 新增 MCP 支持");
  });

  it("works without highlights", () => {
    const msg = buildFeishuMessage({
      date: "2026-03-09",
      reports: ["ai-cli"],
      pagesUrl: BASE_URL,
      highlights: null,
      enabledLangs: ["zh-CN"],
      primaryLang: "zh-CN",
    });
    expect(msg).toContain("AI CLI 工具");
    expect(msg).not.toContain("◦");
  });
});
