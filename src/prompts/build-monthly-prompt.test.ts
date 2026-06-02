import { describe, expect, it } from "vitest";
import { buildMonthlyPrompt } from "./build-monthly-prompt";

const mockDigests: Record<string, string> = {
  "Week 1": "Claude Code added support for MCP servers. OpenClaw reached 10k stars.",
  "Week 2": "GPT-5 was announced. Gemini CLI added new debugging features.",
  "Week 3": "Multiple AI agent frameworks saw significant updates this week.",
};

describe("buildMonthlyPrompt", () => {
  it("includes monthly digest content (default zh)", () => {
    const result = buildMonthlyPrompt(mockDigests, "2026-03");
    expect(result).toContain("Week 1");
    expect(result).toContain("Week 2");
    expect(result).toContain("Week 3");
    expect(result).toContain("Claude Code added");
    expect(result).toContain("GPT-5 was announced");
    expect(result).toContain("Monthly Report");
    expect(result).toContain("Write the response in Chinese.");
  });

  it("generates English variant", () => {
    const result = buildMonthlyPrompt(mockDigests, "2026-03", "en-US");
    expect(result).toContain("Week 1");
    expect(result).toContain("Week 2");
    expect(result).toContain("Claude Code added");
    expect(result).toContain("GPT-5 was announced");
    expect(result).toContain("Monthly Report");
    expect(result).toContain("Write the response in English.");
  });

  it("generates English variant 2", () => {
    const result = buildMonthlyPrompt(mockDigests, "2026-03", "en-US");
    expect(result).toContain("Week 1");
    expect(result).toContain("Week 2");
    expect(result).toContain("Claude Code added");
    expect(result).toContain("Monthly Report");
    expect(result).toContain("English");
  });

  it("includes month string and report count in output", () => {
    const result = buildMonthlyPrompt(mockDigests, "2026-03");
    expect(result).toContain("2026-03");
    expect(result).toContain("3");
  });
});
