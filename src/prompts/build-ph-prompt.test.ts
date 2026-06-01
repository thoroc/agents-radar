import { describe, expect, it } from "vitest";
import type { PhData, PhProduct } from "../fetchers/ph";
import { buildPhPrompt } from "./build-ph-prompt";

const makeProduct = (overrides: Partial<PhProduct> = {}): PhProduct => ({
  id: "12345",
  name: "AI Code Assistant",
  tagline: "Your AI pair programmer",
  url: "https://www.producthunt.com/posts/ai-code-assistant",
  website: "https://aicodesasistant.example.com",
  votesCount: 250,
  commentsCount: 42,
  createdAt: "2026-03-09T00:00:00Z",
  topics: ["artificial-intelligence", "developer-tools", "open-source"],
  ...overrides,
});

const makeData = (overrides: Partial<PhData> = {}): PhData => ({
  products: [makeProduct()],
  fetchSuccess: true,
  ...overrides,
});

describe("buildPhPrompt", () => {
  it("includes product details in Chinese (default)", () => {
    const result = buildPhPrompt(makeData(), "2026-03-09");
    expect(result).toContain("Product Hunt AI 产品日报");
    expect(result).toContain("AI Code Assistant");
    expect(result).toContain("Your AI pair programmer");
    expect(result).toContain("投票: 250");
    expect(result).toContain("评论: 42");
    expect(result).toContain("2026-03-09");
  });

  it("generates English variant", () => {
    const result = buildPhPrompt(makeData(), "2026-03-09", "en");
    expect(result).toContain("Product Hunt AI Products Digest");
    expect(result).toContain("Votes:");
    expect(result).toContain("Comments:");
    expect(result).toContain("Topics:");
  });

  it("handles empty products gracefully", () => {
    const data = makeData({ products: [] });
    const result = buildPhPrompt(data, "2026-03-09");
    expect(result).toContain("0 个");
  });

  it("handles multiple products", () => {
    const data = makeData({
      products: [
        makeProduct({ name: "Product A", votesCount: 100 }),
        makeProduct({ name: "Product B", votesCount: 50 }),
      ],
    });
    const result = buildPhPrompt(data, "2026-03-09");
    expect(result).toContain("Product A");
    expect(result).toContain("Product B");
    expect(result).toContain("2 个");
  });
});
