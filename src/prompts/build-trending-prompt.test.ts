import { describe, expect, it } from "vitest";
import type { TrendingData } from "../fetchers/trending";
import { buildTrendingPrompt } from "./build-trending-prompt";

const mockData: TrendingData = {
  trendingRepos: [
    {
      fullName: "owner/ai-tool",
      description: "An AI tool",
      language: "TypeScript",
      todayStars: 500,
      totalStars: 10000,
      forks: 2000,
      url: "https://github.com/owner/ai-tool",
    },
    {
      fullName: "owner/ml-framework",
      description: "A machine learning framework",
      language: "Python",
      todayStars: 300,
      totalStars: 50000,
      forks: 8000,
      url: "https://github.com/owner/ml-framework",
    },
  ],
  searchRepos: [
    {
      fullName: "owner/llm-app",
      description: "An LLM application",
      language: "Rust",
      stargazersCount: 5000,
      pushedAt: "2026-03-08T12:00:00Z",
      url: "https://github.com/owner/llm-app",
      searchQuery: "llm",
    },
  ],
  trendingFetchSuccess: true,
};

describe("buildTrendingPrompt", () => {
  it("includes repo names and metadata in default locale", () => {
    const result = buildTrendingPrompt(mockData, "2026-03-09");
    expect(result).toContain("owner/ai-tool");
    expect(result).toContain("owner/ml-framework");
    expect(result).toContain("owner/llm-app");
    expect(result).toContain("GitHub Trending");
    expect(result).toContain("10,000");
    expect(result).toContain("50,000");
    expect(result).toContain("Write the response in Chinese");
  });

  it("generates English variant", () => {
    const result = buildTrendingPrompt(mockData, "2026-03-09", "en-US");
    expect(result).toContain("owner/ai-tool");
    expect(result).toContain("owner/llm-app");
    expect(result).toContain("Trending");
    expect(result).toContain("Topic Repos");
    expect(result).toContain("Write the response in English");
  });

  it("includes date string in output", () => {
    const result = buildTrendingPrompt(mockData, "2026-03-09");
    expect(result).toContain("2026-03-09");
  });
});
