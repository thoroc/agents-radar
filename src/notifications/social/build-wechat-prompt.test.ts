import { describe, expect, it } from "vitest";
import { buildWechatPrompt } from "./build-wechat-prompt";

describe("buildWechatPrompt", () => {
  it("includes the date range and reports", () => {
    const result = buildWechatPrompt("2026-W10", "weekly content");
    expect(result).toContain("2026-W10");
    expect(result).toContain("weekly content");
  });

  it("contains expected sections", () => {
    const result = buildWechatPrompt("2026-W10", "data");
    expect(result).toContain("本周速览");
    expect(result).toContain("AI CLI 工具周报");
    expect(result).toContain("AI Agent 生态");
    expect(result).toContain("开源趋势与社区热点");
    expect(result).toContain("本周观点");
  });
});
