import { describe, expect, it } from "vitest";
import type { GitHubItem } from "../github/types";
import { topN } from "./top-n";

const makeItem = (overrides: Partial<GitHubItem> = {}): GitHubItem => ({
  number: 1,
  title: "Issue",
  state: "open",
  user: { login: "alice" },
  labels: [],
  created_at: "2026-03-09T00:00:00Z",
  updated_at: "2026-03-09T12:00:00Z",
  comments: 5,
  reactions: { "+1": 2 },
  body: "body",
  html_url: "https://github.com/org/test/issues/1",
  ...overrides,
});

describe("topN", () => {
  it("returns top N items sorted by comment count desc", () => {
    const items = [
      makeItem({ number: 1, comments: 2 }),
      makeItem({ number: 2, comments: 10 }),
      makeItem({ number: 3, comments: 5 }),
      makeItem({ number: 4, comments: 8 }),
    ];
    const result = topN(items, 2);
    expect(result).toHaveLength(2);
    expect(result[0]!.number).toBe(2);
    expect(result[1]!.number).toBe(4);
  });

  it("returns all items if n >= items.length", () => {
    const items = [makeItem({ comments: 1 }), makeItem({ comments: 2 })];
    expect(topN(items, 5)).toHaveLength(2);
  });

  it("does not mutate the original array", () => {
    const items = [makeItem({ comments: 1 }), makeItem({ comments: 5 })];
    const original = [...items];
    topN(items, 1);
    expect(items[0]!.comments).toBe(original[0]!.comments);
    expect(items[1]!.comments).toBe(original[1]!.comments);
  });

  it("returns empty array for empty input", () => {
    expect(topN([], 3)).toEqual([]);
  });
});
