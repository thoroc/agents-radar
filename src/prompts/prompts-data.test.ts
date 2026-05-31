import { describe, expect, it } from "vitest";
import type { HnData } from "../fetchers/hn";
import type { TrendingData } from "../fetchers/trending";
import type { WebFetchResult } from "../fetchers/web";
import {
  buildHnPrompt,
  buildMonthlyPrompt,
  buildTrendingPrompt,
  buildWebReportPrompt,
  buildWeeklyPrompt,
} from "./prompts-data";

// ---------------------------------------------------------------------------
// buildTrendingPrompt
// ---------------------------------------------------------------------------

describe("buildTrendingPrompt", () => {
  it("includes trending repos", () => {
    const data: TrendingData = {
      trendingRepos: [
        {
          fullName: "org/repo",
          description: "desc",
          language: "Python",
          todayStars: 100,
          totalStars: 5000,
          forks: 200,
          url: "https://github.com/org/repo",
        },
      ],
      searchRepos: [],
      trendingFetchSuccess: true,
    };
    const result = buildTrendingPrompt(data, "2026-03-09");
    expect(result).toContain("org/repo");
    expect(result).toContain("Python");
    expect(result).toContain("5,000");
    expect(result).toContain("+100 today");
  });

  it("shows fetch failure message when trending fails", () => {
    const data: TrendingData = { trendingRepos: [], searchRepos: [], trendingFetchSuccess: false };
    const result = buildTrendingPrompt(data, "2026-03-09");
    expect(result).toContain("未能抓取");
  });

  it("includes search repos with topic tag", () => {
    const data: TrendingData = {
      trendingRepos: [],
      searchRepos: [
        {
          fullName: "ai/agent",
          description: "An AI agent",
          language: "TypeScript",
          stargazersCount: 1000,
          pushedAt: "2026-03-08",
          url: "https://github.com/ai/agent",
          searchQuery: "ai-agent",
        },
      ],
      trendingFetchSuccess: false,
    };
    const result = buildTrendingPrompt(data, "2026-03-09");
    expect(result).toContain("[topic:ai-agent]");
    expect(result).toContain("1,000");
  });
});

// ---------------------------------------------------------------------------
// buildWebReportPrompt
// ---------------------------------------------------------------------------

describe("buildWebReportPrompt", () => {
  it("includes site sections for first run", () => {
    const results: WebFetchResult[] = [
      {
        site: "anthropic",
        siteName: "Anthropic",
        isFirstRun: true,
        newItems: [
          {
            url: "https://anthropic.com/news/test",
            title: "Test",
            lastmod: "2026-03-09",
            content: "Content",
            site: "anthropic",
            category: "news",
          },
        ],
        totalDiscovered: 50,
      },
    ];
    const result = buildWebReportPrompt(results, "2026-03-09");
    expect(result).toContain("首次全量抓取");
    expect(result).toContain("Anthropic");
    expect(result).toContain("内容格局总览");
  });

  it("shows incremental mode for non-first-run", () => {
    const results: WebFetchResult[] = [
      { site: "openai", siteName: "OpenAI", isFirstRun: false, newItems: [], totalDiscovered: 100 },
    ];
    const result = buildWebReportPrompt(results, "2026-03-09");
    expect(result).toContain("增量更新");
    expect(result).not.toContain("内容格局总览");
  });
});

// ---------------------------------------------------------------------------
// buildWeeklyPrompt
// ---------------------------------------------------------------------------

describe("buildWeeklyPrompt", () => {
  it("includes daily digest entries", () => {
    const digests = { "2026-03-03": "Day 1 content", "2026-03-04": "Day 2 content" };
    const result = buildWeeklyPrompt(digests, "2026-W10");
    expect(result).toContain("2026-03-03");
    expect(result).toContain("Day 1 content");
    expect(result).toContain("2026-W10");
    expect(result).toContain("周报");
  });

  it("generates English variant", () => {
    const result = buildWeeklyPrompt({ "2026-03-03": "content" }, "2026-W10", "en");
    expect(result).toContain("weekly recap");
  });
});

// ---------------------------------------------------------------------------
// buildMonthlyPrompt
// ---------------------------------------------------------------------------

describe("buildMonthlyPrompt", () => {
  it("includes source digests and month", () => {
    const digests = { "2026-02-01": "Week 1", "2026-02-08": "Week 2" };
    const result = buildMonthlyPrompt(digests, "2026-02");
    expect(result).toContain("2026-02");
    expect(result).toContain("2 份报告");
    expect(result).toContain("月报");
  });

  it("generates English variant", () => {
    const result = buildMonthlyPrompt({ "2026-02-01": "w1" }, "2026-02", "en");
    expect(result).toContain("monthly review");
  });
});

// ---------------------------------------------------------------------------
// buildHnPrompt
// ---------------------------------------------------------------------------

describe("buildHnPrompt", () => {
  it("includes stories with metadata", () => {
    const data: HnData = {
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
      ],
      fetchSuccess: true,
    };
    const result = buildHnPrompt(data, "2026-03-09");
    expect(result).toContain("AI News");
    expect(result).toContain("分数: 200");
    expect(result).toContain("评论: 50");
    expect(result).toContain("作者: bob");
    expect(result).toContain("共 1 条");
  });

  it("generates English variant", () => {
    const data: HnData = {
      stories: [
        {
          id: "1",
          title: "Test",
          url: "https://test.com",
          hnUrl: "https://news.ycombinator.com/item?id=1",
          points: 10,
          comments: 2,
          author: "a",
          createdAt: "2026-03-09T10:00:00Z",
        },
      ],
      fetchSuccess: true,
    };
    const result = buildHnPrompt(data, "2026-03-09", "en");
    expect(result).toContain("Score: 10");
    expect(result).toContain("Comments: 2");
    expect(result).toContain("Hacker News");
  });
});
