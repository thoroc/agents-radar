import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchPhData } from "./ph";

const makeGraphQLResponse = (products: Array<Record<string, unknown>>) => ({
  data: {
    posts: {
      edges: products.map((p) => ({
        node: {
          id: p.id,
          name: p.name,
          tagline: p.tagline,
          url: p.url,
          website: p.website,
          votesCount: p.votesCount,
          commentsCount: p.commentsCount,
          createdAt: p.createdAt,
          topics: {
            edges: ((p.topics as Array<{ slug: string; name: string }>) ?? []).map((t) => ({
              node: { slug: t.slug, name: t.name },
            })),
          },
        },
      })),
    },
  },
});

const aiProduct = {
  id: "12345",
  name: "AI Tool",
  tagline: "Amazing AI tool",
  url: "https://www.producthunt.com/posts/ai-tool",
  website: "https://ai-tool.com",
  votesCount: 150,
  commentsCount: 25,
  createdAt: "2026-05-30T12:00:00Z",
  topics: [{ slug: "artificial-intelligence", name: "Artificial Intelligence" }],
};

const nonAiProduct = {
  id: "67890",
  name: "Regular App",
  tagline: "Not AI related",
  url: "https://www.producthunt.com/posts/regular-app",
  website: "https://regular-app.com",
  votesCount: 50,
  commentsCount: 5,
  createdAt: "2026-05-30T12:00:00Z",
  topics: [{ slug: "productivity", name: "Productivity" }],
};

beforeEach(() => {
  vi.restoreAllMocks();
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => makeGraphQLResponse([aiProduct]),
  });
});

describe("fetchPhData", () => {
  it("returns parsed products on success", async () => {
    const result = await fetchPhData("test-token");
    expect(result.fetchSuccess).toBe(true);
    expect(result.products).toHaveLength(1);
    expect(result.products[0]!.name).toBe("AI Tool");
    expect(result.products[0]!.votesCount).toBe(150);
    expect(result.products[0]!.topics).toContain("Artificial Intelligence");
  });

  it("returns fetchSuccess false when token is missing", async () => {
    const result = await fetchPhData("");
    expect(result.fetchSuccess).toBe(false);
    expect(result.products).toHaveLength(0);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("returns empty products on HTTP error", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({}),
    });
    const result = await fetchPhData("test-token");
    expect(result.fetchSuccess).toBe(false);
    expect(result.products).toHaveLength(0);
  });

  it("returns empty products on GraphQL errors", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { posts: { edges: [] } },
        errors: [{ message: "Rate limit exceeded" }],
      }),
    });
    const result = await fetchPhData("test-token");
    expect(result.fetchSuccess).toBe(false);
    expect(result.products).toHaveLength(0);
  });

  it("filters out non-AI products", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => makeGraphQLResponse([aiProduct, nonAiProduct]),
    });
    const result = await fetchPhData("test-token");
    expect(result.products).toHaveLength(1);
    expect(result.products[0]!.name).toBe("AI Tool");
  });

  it("returns empty on network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    const result = await fetchPhData("test-token");
    expect(result.fetchSuccess).toBe(false);
    expect(result.products).toHaveLength(0);
  });

  it("falls back website to url when website is empty", async () => {
    const minimalProduct = {
      id: "99999",
      name: "Minimal",
      tagline: "Minimal product",
      url: "https://www.producthunt.com/posts/minimal",
      website: "",
      votesCount: 10,
      commentsCount: 0,
      createdAt: "2026-05-30T12:00:00Z",
      topics: [{ slug: "artificial-intelligence", name: "Artificial Intelligence" }],
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => makeGraphQLResponse([minimalProduct]),
    });
    const result = await fetchPhData("test-token");
    expect(result.products).toHaveLength(1);
    expect(result.products[0]!.website).toBe(result.products[0]!.url);
  });

  it("sorts products by votesCount descending", async () => {
    const productA = { ...aiProduct, id: "1", name: "A", votesCount: 50 };
    const productB = { ...aiProduct, id: "2", name: "B", votesCount: 200 };
    const productC = { ...aiProduct, id: "3", name: "C", votesCount: 100 };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => makeGraphQLResponse([productA, productB, productC]),
    });
    const result = await fetchPhData("test-token");
    expect(result.products.map((p) => p.name)).toEqual(["B", "C", "A"]);
  });
});
