import { describe, expect, it } from "vitest";
import type { HackerNewsData } from "../fetchers/hacker-news";
import { buildHackerNewsPrompt } from "./build-hn-prompt";

const mockData: HackerNewsData = {
  stories: [
    {
      id: "123",
      title: "AI News",
      url: "https://example.com/ai",
      hnUrl: "https://news.ycombinator.com/item?id=123",
      points: 200,
      comments: 50,
      author: "bob",
      createdAt: "2026-03-09T10:00:00Z",
    },
    {
      id: "456",
      title: "LLM Research",
      url: "https://example.com/llm",
      hnUrl: "https://news.ycombinator.com/item?id=456",
      points: 150,
      comments: 30,
      author: "alice",
      createdAt: "2026-03-09T09:00:00Z",
    },
  ],
  fetchSuccess: true,
};

describe("buildHackerNewsPrompt", () => {
  it("includes story titles and metadata in Chinese (default)", () => {
    const result = buildHackerNewsPrompt(mockData, "2026-03-09");
    expect(result).toContain("AI News");
    expect(result).toContain("LLM Research");
    expect(result).toContain("分数: 200");
    expect(result).toContain("评论: 50");
    expect(result).toContain("Hacker News");
  });

  it("generates English variant", () => {
    const result = buildHackerNewsPrompt(mockData, "2026-03-09", "en");
    expect(result).toContain("AI News");
    expect(result).toContain("Score: 200");
    expect(result).toContain("Comments: 50");
    expect(result).toContain("Hacker News");
    expect(result).toContain("English");
  });

  it("includes date string in output", () => {
    const result = buildHackerNewsPrompt(mockData, "2026-03-09");
    expect(result).toContain("2026-03-09");
  });
});
