import { describe, expect, it } from "vitest";
import type { ProductHuntData, ProductHuntProduct } from "../fetchers/product-hunt";
import { buildProductHuntPrompt } from "./product-hunt";

const makeProduct = (overrides: Partial<ProductHuntProduct> = {}): ProductHuntProduct => ({
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

const makeData = (overrides: Partial<ProductHuntData> = {}): ProductHuntData => ({
  products: [makeProduct()],
  fetchSuccess: true,
  ...overrides,
});

describe("buildProductHuntPrompt", () => {
  it("includes product details in default locale", () => {
    const result = buildProductHuntPrompt(makeData(), "2026-03-09", "zh-CN");
    expect(result).toContain("Product Hunt AI Products Digest");
    expect(result).toContain("AI Code Assistant");
    expect(result).toContain("Your AI pair programmer");
    expect(result).toContain("Votes: 250");
    expect(result).toContain("Comments: 42");
    expect(result).toContain("2026-03-09");
    expect(result).toContain("Write the response in Chinese");
  });

  it("generates English variant", () => {
    const result = buildProductHuntPrompt(makeData(), "2026-03-09", "en-US");
    expect(result).toContain("Product Hunt AI Products Digest");
    expect(result).toContain("Votes:");
    expect(result).toContain("Comments:");
    expect(result).toContain("Topics:");
    expect(result).toContain("Write the response in English");
  });

  it("handles empty products gracefully", () => {
    const data = makeData({ products: [] });
    const result = buildProductHuntPrompt(data, "2026-03-09", "zh-CN");
    expect(result).toContain("0 products");
  });

  it("handles multiple products", () => {
    const data = makeData({
      products: [
        makeProduct({ name: "Product A", votesCount: 100 }),
        makeProduct({ name: "Product B", votesCount: 50 }),
      ],
    });
    const result = buildProductHuntPrompt(data, "2026-03-09", "zh-CN");
    expect(result).toContain("Product A");
    expect(result).toContain("Product B");
    expect(result).toContain("2 products");
  });
});
