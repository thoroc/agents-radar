import { describe, expect, it } from "vitest";
import { urlCategory } from "./url-category";

describe("urlCategory", () => {
  it("extracts first path segment as category", () => {
    expect(urlCategory("https://example.com/news/article")).toBe("news");
  });

  it("returns 'article' for root path", () => {
    expect(urlCategory("https://example.com/")).toBe("article");
  });

  it("returns 'article' for domain-only url", () => {
    expect(urlCategory("https://example.com")).toBe("article");
  });

  it("handles deep paths", () => {
    expect(urlCategory("https://example.com/research/2026/paper")).toBe("research");
  });

  it("returns 'article' for invalid url", () => {
    expect(urlCategory("not-a-url")).toBe("article");
  });

  it("handles paths with trailing slash", () => {
    expect(urlCategory("https://example.com/engineering/")).toBe("engineering");
  });
});
