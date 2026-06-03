import { describe, expect, it } from "vitest";
import { buildXiaohongshuPrompt } from "./xiaohongshu";

describe("buildXiaohongshuPrompt", () => {
  it("includes the date and reports in the prompt", () => {
    const result = buildXiaohongshuPrompt("report content", "2026-03-09");
    expect(result).toContain("2026-03-09");
    expect(result).toContain("report content");
  });

  it("contains expected sections", () => {
    const result = buildXiaohongshuPrompt("data", "2026-03-09");
    expect(result).toContain("标题");
    expect(result).toContain("正文");
    expect(result).toContain("风格要求");
  });

  it("includes platform-specific constraints", () => {
    const result = buildXiaohongshuPrompt("data", "2026-03-09");
    expect(result).toContain("小红书");
    expect(result).toContain("不支持外链");
  });
});
