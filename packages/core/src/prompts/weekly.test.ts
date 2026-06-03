import { describe, expect, it } from "vitest";
import { buildWeeklyPrompt } from "./weekly";

const mockDigests: Record<string, string> = {
  "2026-03-09": "Claude Code released a new feature for automated testing.",
  "2026-03-08": "OpenAI introduced GPT-5 with enhanced reasoning capabilities.",
};

describe("buildWeeklyPrompt", () => {
  it("includes weekly digest content in default locale", () => {
    const result = buildWeeklyPrompt(mockDigests, "2026-03-09 ~ 2026-03-15", "zh-CN");
    expect(result).toContain("2026-03-09");
    expect(result).toContain("2026-03-08");
    expect(result).toContain("Claude Code released");
    expect(result).toContain("OpenAI introduced");
    expect(result).toContain("Weekly Report");
    expect(result).toContain("Write the response in Chinese");
  });

  it("generates English variant", () => {
    const result = buildWeeklyPrompt(mockDigests, "2026-03-09 ~ 2026-03-15", "en-US");
    expect(result).toContain("Claude Code released");
    expect(result).toContain("OpenAI introduced");
    expect(result).toContain("Weekly Report");
    expect(result).toContain("Write the response in English");
  });

  it("includes week string in output", () => {
    const result = buildWeeklyPrompt(mockDigests, "2026-03-09 ~ 2026-03-15", "zh-CN");
    expect(result).toContain("2026-03-09 ~ 2026-03-15");
  });
});
