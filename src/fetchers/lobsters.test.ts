import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchLobstersData } from "./lobsters";

const hoursAgo = (h: number): string => new Date(Date.now() - h * 3600 * 1000).toISOString();

const sampleStory = {
  short_id: "abc123",
  title: "AI in Practice",
  url: "https://example.com/ai-in-practice",
  comments_url: "https://lobste.rs/s/abc123",
  score: 45,
  comment_count: 12,
  submitter_user: { username: "hacker1" },
  created_at: hoursAgo(2),
  tags: ["ai", "ml"],
};

beforeEach(() => {
  vi.restoreAllMocks();
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [sampleStory],
  });
});

describe("fetchLobstersData", () => {
  it("returns parsed stories on success", async () => {
    const result = await fetchLobstersData();
    expect(result.fetchSuccess).toBe(true);
    expect(result.stories).toHaveLength(1);
    expect(result.stories[0]!.title).toBe("AI in Practice");
    expect(result.stories[0]!.score).toBe(45);
    expect(result.stories[0]!.commentCount).toBe(12);
    expect(result.stories[0]!.author).toBe("hacker1");
    expect(result.stories[0]!.tags).toEqual(["ai", "ml"]);
  });

  it("returns empty stories on fetch failure", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    const result = await fetchLobstersData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.stories).toHaveLength(0);
  });

  it("returns empty stories on HTTP error", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    const result = await fetchLobstersData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.stories).toHaveLength(0);
  });

  it("uses comments_url as fallback when url is empty", async () => {
    const storyNoUrl = {
      ...sampleStory,
      short_id: "def456",
      url: "",
      comments_url: "https://lobste.rs/s/def456",
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [storyNoUrl],
    });
    const result = await fetchLobstersData();
    expect(result.stories[0]!.url).toBe("https://lobste.rs/s/def456");
  });

  it("deduplicates stories across tag endpoints", async () => {
    const story1 = { ...sampleStory, short_id: "uniq1", title: "Story 1" };
    const story2 = { ...sampleStory, short_id: "uniq2", title: "Story 2" };
    let callCount = 0;
    globalThis.fetch = vi.fn().mockImplementation(() => {
      callCount++;
      return Promise.resolve({
        ok: true,
        json: async () => (callCount === 1 ? [story1, story2] : [story1, { ...story2, score: 99 }]),
      });
    });
    const result = await fetchLobstersData();
    expect(result.stories).toHaveLength(2);
  });

  it("filters stories older than 7 days", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { ...sampleStory, short_id: "recent1", title: "Recent", created_at: hoursAgo(12) },
        { ...sampleStory, short_id: "old1", title: "Old", created_at: hoursAgo(300) },
      ],
    });
    const result = await fetchLobstersData();
    expect(result.stories).toHaveLength(1);
    expect(result.stories[0]!.title).toBe("Recent");
  });

  it("handles one tag endpoint failing while the other succeeds", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => [sampleStory] })
      .mockRejectedValueOnce(new Error("Network error"));
    const result = await fetchLobstersData();
    expect(result.stories).toHaveLength(1);
  });

  it("sorts stories by score descending", async () => {
    const storyA = { ...sampleStory, short_id: "a", score: 10 };
    const storyB = { ...sampleStory, short_id: "b", score: 100 };
    const storyC = { ...sampleStory, short_id: "c", score: 50 };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [storyA, storyB, storyC],
    });
    const result = await fetchLobstersData();
    expect(result.stories.map((s) => s.score)).toEqual([100, 50, 10]);
  });
});
