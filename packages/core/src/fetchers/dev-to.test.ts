import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchDevToData } from "./dev-to";

const sampleArticle = {
  id: 12345,
  title: "Introduction to LLMs",
  description: "A comprehensive guide to Large Language Models",
  url: "https://dev.to/author/introduction-to-llms",
  published_at: "2026-05-31T10:00:00Z",
  positive_reactions_count: 150,
  comments_count: 25,
  reading_time_minutes: 8,
  tag_list: ["ai", "llm", "machinelearning"],
  user: { name: "Tech Author" },
};

beforeEach(() => {
  vi.restoreAllMocks();
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [sampleArticle],
  });
});

describe("fetchDevToData", () => {
  it("returns parsed articles on success", async () => {
    const result = await fetchDevToData();
    expect(result.fetchSuccess).toBe(true);
    expect(result.articles).toHaveLength(1);
    expect(result.articles[0]!.id).toBe(12345);
    expect(result.articles[0]!.title).toBe("Introduction to LLMs");
    expect(result.articles[0]!.user).toBe("Tech Author");
    expect(result.articles[0]!.tags).toContain("ai");
    expect(result.articles[0]!.readingTimeMinutes).toBe(8);
  });

  it("returns empty articles on fetch failure", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    const result = await fetchDevToData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.articles).toHaveLength(0);
  });

  it("returns empty articles when API responds with HTTP error", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    });
    const result = await fetchDevToData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.articles).toHaveLength(0);
  });

  it("deduplicates articles with same ID across tag queries", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [sampleArticle, { ...sampleArticle, id: 67890, title: "Another Article" }],
    });
    const result = await fetchDevToData();
    // Run twice to confirm dedup — fetch always returns 2, but dedup should yield only unique IDs
    expect(result.articles.length).toBeLessThanOrEqual(2);
  });

  it("sorts articles by positiveReactionsCount descending", async () => {
    const articleA = { ...sampleArticle, id: 1, positive_reactions_count: 10 };
    const articleB = { ...sampleArticle, id: 2, positive_reactions_count: 200 };
    const articleC = { ...sampleArticle, id: 3, positive_reactions_count: 50 };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [articleA, articleB, articleC],
    });
    const result = await fetchDevToData();
    expect(result.articles.map((a) => a.positiveReactionsCount)).toEqual([200, 50, 10]);
  });

  it("handles partial tag failures gracefully", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => [sampleArticle] })
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] });
    const result = await fetchDevToData();
    expect(result.fetchSuccess).toBe(true);
    expect(result.articles).toHaveLength(1);
  });
});
