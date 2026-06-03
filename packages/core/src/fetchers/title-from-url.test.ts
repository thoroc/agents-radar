import { describe, expect, it } from "vitest";
import { titleFromUrl } from "./title-from-url";

describe("titleFromUrl", () => {
  it("converts last path segment to title case", () => {
    expect(titleFromUrl("https://example.com/news/hello-world")).toBe("Hello World");
  });

  it("handles single segment paths", () => {
    expect(titleFromUrl("https://example.com/announcement")).toBe("Announcement");
  });

  it("handles multiple hyphens", () => {
    expect(titleFromUrl("https://example.com/news/a-new-ai-breakthrough")).toBe("A New Ai Breakthrough");
  });

  it("removes trailing slash", () => {
    expect(titleFromUrl("https://example.com/news/hello-world/")).toBe("Hello World");
  });

  it("returns the url string when url is invalid", () => {
    expect(titleFromUrl("not-a-url")).toBe("not-a-url");
  });

  it("returns empty string for root path", () => {
    expect(titleFromUrl("https://example.com/")).toBe("");
  });

  it("handles paths with numbers", () => {
    expect(titleFromUrl("https://example.com/blog/post-2026")).toBe("Post 2026");
  });
});
