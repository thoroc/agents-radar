import { describe, expect, it } from "vitest";
import { isSitemapIndex } from "./is-sitemap-index";

describe("isSitemapIndex", () => {
  it("returns true for sitemapindex element", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap1.xml</loc>
  </sitemap>
</sitemapindex>`;
    expect(isSitemapIndex(xml)).toBe(true);
  });

  it("returns true for self-closing sitemapindex tag", () => {
    const xml = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>';
    expect(isSitemapIndex(xml)).toBe(true);
  });

  it("returns false for urlset element", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page</loc>
  </url>
</urlset>`;
    expect(isSitemapIndex(xml)).toBe(false);
  });

  it("returns false for arbitrary XML", () => {
    expect(isSitemapIndex("<root><item>content</item></root>")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isSitemapIndex("")).toBe(false);
  });
});
