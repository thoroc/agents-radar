import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchHnData } from "./hn";

const hoursAgo = (h: number): string => new Date(Date.now() - h * 3600 * 1000).toISOString();

const sampleHit = {
  objectID: "12345",
  title: "AI Breakthrough in Language Models",
  url: "https://example.com/ai-breakthrough",
  points: 350,
  num_comments: 85,
  author: "techwriter",
  created_at: hoursAgo(2),
};

beforeEach(() => {
  vi.restoreAllMocks();
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ hits: [sampleHit] }),
  });
});

describe("fetchHnData", () => {
  it("returns parsed stories on success", async () => {
    const result = await fetchHnData();
    expect(result.fetchSuccess).toBe(true);
    expect(result.stories).toHaveLength(1);
    expect(result.stories[0]!.id).toBe("12345");
    expect(result.stories[0]!.title).toBe("AI Breakthrough in Language Models");
    expect(result.stories[0]!.points).toBe(350);
    expect(result.stories[0]!.comments).toBe(85);
    expect(result.stories[0]!.author).toBe("techwriter");
  });

  it("returns empty stories on fetch failure", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    const result = await fetchHnData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.stories).toHaveLength(0);
  });

  it("returns empty stories on HTTP error", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    });
    const result = await fetchHnData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.stories).toHaveLength(0);
  });

  it("uses hn discussion link as fallback when url is missing", async () => {
    const hitWithoutUrl = { ...sampleHit, objectID: "67890", url: undefined };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ hits: [hitWithoutUrl] }),
    });
    const result = await fetchHnData();
    expect(result.stories[0]!.url).toBe("https://news.ycombinator.com/item?id=67890");
    expect(result.stories[0]!.hnUrl).toBe("https://news.ycombinator.com/item?id=67890");
  });

  it("deduplicates stories across queries", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        hits: [
          { ...sampleHit, objectID: "uniq1", title: "Story 1" },
          { ...sampleHit, objectID: "uniq2", title: "Story 2" },
        ],
      }),
    });
    const result = await fetchHnData();
    expect(result.stories).toHaveLength(2);
  });

  it("sorts stories by points descending", async () => {
    const hitA = { ...sampleHit, objectID: "a", points: 10 };
    const hitB = { ...sampleHit, objectID: "b", points: 500 };
    const hitC = { ...sampleHit, objectID: "c", points: 100 };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ hits: [hitA, hitB, hitC] }),
    });
    const result = await fetchHnData();
    expect(result.stories.map((s) => s.points)).toEqual([500, 100, 10]);
  });

  it("handles partial query failures gracefully", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ hits: [sampleHit] }) })
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce({ ok: true, json: async () => ({ hits: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ hits: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ hits: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ hits: [] }) });
    const result = await fetchHnData();
    expect(result.fetchSuccess).toBe(true);
    expect(result.stories).toHaveLength(1);
  });

  it("handles empty hits array", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ hits: [] }),
    });
    const result = await fetchHnData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.stories).toHaveLength(0);
  });

  it("handles null/undefined fields gracefully", async () => {
    const partialHit = {
      objectID: "99999",
      title: "Partial Data",
      url: undefined,
      points: undefined,
      num_comments: undefined,
      author: "anon",
      created_at: hoursAgo(2),
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ hits: [partialHit] }),
    });
    const result = await fetchHnData();
    expect(result.stories).toHaveLength(1);
    expect(result.stories[0]!.points).toBe(0);
    expect(result.stories[0]!.comments).toBe(0);
  });
});
