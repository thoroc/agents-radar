import { afterEach, describe, expect, it } from "vitest";
import { buildMessage, type Highlights } from "./build-message";

const BASE_URL = "https://example.com/radar";

describe("buildMessage", () => {
  const origPagesUrl = process.env.PAGES_URL;

  afterEach(() => {
    if (origPagesUrl !== undefined) {
      process.env.PAGES_URL = origPagesUrl;
    } else {
      delete process.env.PAGES_URL;
    }
  });

  it("builds a daily message with zh + en reports", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-agents"], BASE_URL, undefined, ["zh-CN", "en-US"]);
    expect(msg).toContain("agents-radar");
    expect(msg).toContain("2026-03-09");
    expect(msg).toContain("📡");
    expect(msg).toContain(`${BASE_URL}/#2026-03-09/ai-cli`);
    expect(msg).toContain("AI CLI 工具");
    expect(msg).toContain(`${BASE_URL}/#2026-03-09/ai-cli.en-US`);
    expect(msg).toContain("AI CLI Tools");
  });

  it("shows weekly icon and suffix for weekly reports", () => {
    const msg = buildMessage("2026-03-09", ["ai-weekly"], BASE_URL, undefined, ["zh-CN"], "zh-CN");
    expect(msg).toContain("📅");
    expect(msg).toContain("周报");
  });

  it("shows monthly icon and suffix for monthly reports", () => {
    const msg = buildMessage("2026-03-09", ["ai-monthly"], BASE_URL, undefined, ["zh-CN"], "zh-CN");
    expect(msg).toContain("📆");
    expect(msg).toContain("月报");
  });

  it("monthly takes priority over weekly", () => {
    const msg = buildMessage(
      "2026-03-09",
      ["ai-weekly", "ai-monthly"],
      BASE_URL,
      undefined,
      ["zh-CN"],
      "zh-CN",
    );
    expect(msg).toContain("📆");
    expect(msg).toContain("月报");
  });

  it("renders zh-only reports without en link", () => {
    const msg = buildMessage("2026-03-09", ["ai-hn"], BASE_URL, undefined, ["zh-CN"], "zh-CN");
    expect(msg).toContain("HN 社区动态");
    expect(msg).not.toContain("HN Community");
  });

  it("includes Web UI and RSS links", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL, undefined, ["zh-CN"], "zh-CN");
    expect(msg).toContain("网页端");
    expect(msg).toContain("RSS");
  });

  it("strips trailing slash from pagesUrl", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli"], `${BASE_URL}/`, undefined, ["zh-CN"], "zh-CN");
    expect(msg).not.toContain("//feed.xml");
  });

  it("includes highlights when provided", () => {
    const highlights: Highlights = {
      "zh-CN": {
        "ai-cli": ["Claude Code 发布 v1.2.0", "Gemini CLI 修复 streaming"],
        "ai-agents": ["OpenClaw 新增 MCP 支持"],
      },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-agents"], BASE_URL, highlights, ["zh-CN", "en-US"]);
    expect(msg).toContain("◦ Claude Code 发布 v1.2.0");
    expect(msg).toContain("◦ Gemini CLI 修复 streaming");
    expect(msg).toContain("◦ OpenClaw 新增 MCP 支持");
  });

  it("works without highlights (null)", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL, null, ["zh-CN"], "zh-CN");
    expect(msg).toContain("AI CLI 工具");
    expect(msg).not.toContain("◦");
  });

  it("works without highlights (undefined)", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL, undefined, ["zh-CN"], "zh-CN");
    expect(msg).toContain("AI CLI 工具");
    expect(msg).not.toContain("◦");
  });
});
