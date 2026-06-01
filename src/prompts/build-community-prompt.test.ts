import { describe, expect, it } from "vitest";
import type { DevtoArticle, DevtoData } from "../fetchers/devto";
import type { LobstersData, LobstersStory } from "../fetchers/lobsters";
import { buildCommunityPrompt } from "./build-community-prompt";

const makeDevtoArticle = (overrides: Partial<DevtoArticle> = {}): DevtoArticle => ({
  id: 1,
  title: "Building AI Agents with TypeScript",
  description: "A comprehensive guide to building AI agents",
  url: "https://dev.to/example/article",
  publishedAt: "2026-03-09T00:00:00Z",
  positiveReactionsCount: 45,
  commentsCount: 12,
  readingTimeMinutes: 8,
  tags: ["ai", "typescript", "agents"],
  user: "techwriter",
  ...overrides,
});

const makeLobstersStory = (overrides: Partial<LobstersStory> = {}): LobstersStory => ({
  title: "Why Local AI Models Are the Future",
  url: "https://example.com/local-ai",
  commentsUrl: "https://lobste.rs/s/abc123",
  score: 87,
  commentCount: 34,
  author: "hacker",
  publishedAt: "2026-03-09T10:00:00Z",
  tags: ["ai", "llm"],
  ...overrides,
});

const makeDevtoData = (overrides: Partial<DevtoData> = {}): DevtoData => ({
  articles: [makeDevtoArticle()],
  fetchSuccess: true,
  ...overrides,
});

const makeLobstersData = (overrides: Partial<LobstersData> = {}): LobstersData => ({
  stories: [makeLobstersStory()],
  fetchSuccess: true,
  ...overrides,
});

describe("buildCommunityPrompt", () => {
  it("includes Dev.to and Lobste.rs sections in Chinese (default)", () => {
    const result = buildCommunityPrompt(makeDevtoData(), makeLobstersData(), "2026-03-09");
    expect(result).toContain("技术社区 AI 动态日报");
    expect(result).toContain("Dev.to 文章");
    expect(result).toContain("Building AI Agents with TypeScript");
    expect(result).toContain("Lobste.rs");
    expect(result).toContain("Why Local AI Models Are the Future");
    expect(result).toContain("2026-03-09");
  });

  it("generates English variant", () => {
    const result = buildCommunityPrompt(makeDevtoData(), makeLobstersData(), "2026-03-09", "en");
    expect(result).toContain("Tech Community AI Digest");
    expect(result).toContain("Dev.to Highlights");
    expect(result).toContain("Lobste.rs Highlights");
    expect(result).toContain("Reactions:");
    expect(result).toContain("Score:");
  });

  it("shows empty placeholders when no articles", () => {
    const emptyDevto: DevtoData = { articles: [], fetchSuccess: false };
    const emptyLobsters: LobstersData = { stories: [], fetchSuccess: false };
    const result = buildCommunityPrompt(emptyDevto, emptyLobsters, "2026-03-09");
    expect(result).toContain("无 Dev.to 文章");
    expect(result).toContain("无 Lobste.rs 内容");
  });

  it("shows English empty placeholders", () => {
    const emptyDevto: DevtoData = { articles: [], fetchSuccess: false };
    const emptyLobsters: LobstersData = { stories: [], fetchSuccess: false };
    const result = buildCommunityPrompt(emptyDevto, emptyLobsters, "2026-03-09", "en");
    expect(result).toContain("No Dev.to articles");
    expect(result).toContain("No Lobste.rs stories");
  });
});
