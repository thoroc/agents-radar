import { describe, expect, it } from "vitest";
import { buildWechatMonthlyPrompt } from "./build-wechat-monthly-prompt";

describe("buildWechatMonthlyPrompt", () => {
  it("includes the date range and reports", () => {
    const result = buildWechatMonthlyPrompt("2026-03", "monthly content");
    expect(result).toContain("2026-03");
    expect(result).toContain("monthly content");
  });

  it("contains expected sections", () => {
    const result = buildWechatMonthlyPrompt("2026-03", "data");
    expect(result).toContain("月度总览");
    expect(result).toContain("AI 编程工具演进");
    expect(result).toContain("AI Agent 生态格局");
    expect(result).toContain("月度深度观点");
  });
});
