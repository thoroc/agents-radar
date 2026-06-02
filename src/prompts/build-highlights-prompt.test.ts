import { describe, expect, it } from "vitest";
import { buildHighlightsPrompt } from "./build-highlights-prompt";

describe("buildHighlightsPrompt", () => {
  const sampleContents: Record<string, string> = {
    "ai-cli": "Some CLI tools had releases today.",
    "ai-agents": "New agent frameworks emerged.",
  };

  it("includes report sections in default locale", () => {
    const result = buildHighlightsPrompt(sampleContents);
    expect(result).toContain("[ai-cli]");
    expect(result).toContain("[ai-agents]");
    expect(result).toContain("Some CLI tools had releases today.");
    expect(result).toContain("New agent frameworks emerged.");
    expect(result).toContain("news editor");
    expect(result).toContain("6 highlights");
    expect(result).toContain("Write the response in Chinese");
  });

  it("generates English variant", () => {
    const result = buildHighlightsPrompt(sampleContents, "en-US");
    expect(result).toContain("news editor");
    expect(result).toContain("6 highlights");
    expect(result).toContain("Write the response in English");
  });

  it("respects custom itemsPerReport", () => {
    const result = buildHighlightsPrompt(sampleContents, "zh-CN", 3);
    expect(result).toContain("3 highlights");
  });

  it("truncates long content to 2000 chars", () => {
    const longContent = "X".repeat(3000);
    const contents = { "ai-cli": longContent };
    const result = buildHighlightsPrompt(contents);
    expect(result).toContain("X".repeat(2000));
    expect(result).not.toContain("X".repeat(2001));
  });

  it("requires JSON output format", () => {
    const result = buildHighlightsPrompt(sampleContents, "en-US");
    expect(result).toContain("Return ONLY valid JSON");
    expect(result).toContain("no markdown fences");
  });
});
