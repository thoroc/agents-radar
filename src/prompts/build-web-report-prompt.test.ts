import { describe, expect, it } from "vitest";
import type { WebFetchResult } from "../fetchers";
import { buildWebReportPrompt } from "./build-web-report-prompt";

const mockResults: WebFetchResult[] = [
  {
    site: "anthropic",
    siteName: "Anthropic Blog",
    isFirstRun: false,
    newItems: [
      {
        url: "https://anthropic.com/news/claude-4",
        title: "Introducing Claude 4",
        lastmod: "2026-03-09T08:00:00Z",
        content: "Claude 4 brings significant improvements in reasoning and coding.",
        site: "anthropic",
        category: "News",
      },
    ],
    totalDiscovered: 50,
  },
  {
    site: "openai",
    siteName: "OpenAI Blog",
    isFirstRun: true,
    newItems: [
      {
        url: "https://openai.com/blog/gpt-5",
        title: "GPT-5 Release",
        lastmod: "2026-03-08T12:00:00Z",
        content: "",
        site: "openai",
        category: "Research",
      },
    ],
    totalDiscovered: 100,
  },
];

describe("buildWebReportPrompt", () => {
  it("includes site names and article titles in Chinese (default)", () => {
    const result = buildWebReportPrompt(mockResults, "2026-03-09", "zh-CN");
    expect(result).toContain("Anthropic Blog");
    expect(result).toContain("OpenAI Blog");
    expect(result).toContain("Introducing Claude 4");
    expect(result).toContain("GPT-5 Release");
    expect(result).toContain("Anthropic");
    expect(result).toContain("OpenAI");
  });

  it("generates English variant", () => {
    const result = buildWebReportPrompt(mockResults, "2026-03-09", "en-US");
    expect(result).toContain("Anthropic Blog");
    expect(result).toContain("OpenAI Blog");
    expect(result).toContain("Introducing Claude 4");
    expect(result).toContain("GPT-5 Release");
    expect(result).toContain("Incremental update");
    expect(result).toContain("First full crawl");
    expect(result).toContain("English");
  });

  it("includes date string in output", () => {
    const result = buildWebReportPrompt(mockResults, "2026-03-09", "zh-CN");
    expect(result).toContain("2026-03-09");
  });
});
