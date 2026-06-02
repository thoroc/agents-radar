import { describe, expect, it } from "vitest";
import { parseSitemapUrls } from "./parse-sitemap-urls";

describe("parseSitemapUrls", () => {
  it("parses URLs from sitemap XML", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page1</loc>
    <lastmod>2026-05-30</lastmod>
  </url>
  <url>
    <loc>https://example.com/page2</loc>
  </url>
</urlset>`;
    const result = parseSitemapUrls(xml);
    expect(result).toHaveLength(2);
    expect(result[0]!.loc).toBe("https://example.com/page1");
    expect(result[0]!.lastmod).toBe("2026-05-30");
    expect(result[1]!.loc).toBe("https://example.com/page2");
    expect(result[1]!.lastmod).toBeUndefined();
  });

  it("returns empty array for XML without url elements", () => {
    const xml = '<?xml version="1.0" encoding="UTF-8"?><root></root>';
    expect(parseSitemapUrls(xml)).toEqual([]);
  });

  it("returns empty array for empty string", () => {
    expect(parseSitemapUrls("")).toEqual([]);
  });

  it("ignores url blocks without loc element", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url>
    <lastmod>2026-05-30</lastmod>
  </url>
</urlset>`;
    expect(parseSitemapUrls(xml)).toEqual([]);
  });

  it("trims whitespace around loc and lastmod values", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url>
    <loc>  https://example.com/page  </loc>
    <lastmod>  2026-05-30  </lastmod>
  </url>
</urlset>`;
    const result = parseSitemapUrls(xml);
    expect(result[0]!.loc).toBe("https://example.com/page");
    expect(result[0]!.lastmod).toBe("2026-05-30");
  });
});
