import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchSiteContent } from "./fetch-site-content";
import type { WebState } from "./web-state-types";

const sampleSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.anthropic.com/news/announcement</loc>
    <lastmod>2026-05-30</lastmod>
  </url>
  <url>
    <loc>https://www.anthropic.com/research/paper</loc>
    <lastmod>2026-05-29</lastmod>
  </url>
</urlset>`;

const emptyState: WebState = {
  anthropic: { lastChecked: "", seenUrls: {} },
  openai: { lastChecked: "", seenUrls: {} },
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("fetchSiteContent", () => {
  it("discovers and returns new URLs from sitemap for anthropic", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => sampleSitemapXml,
    });
    const result = await fetchSiteContent("anthropic", emptyState);
    expect(result.site).toBe("anthropic");
    expect(result.totalDiscovered).toBe(2);
    expect(result.isFirstRun).toBe(true);
  });

  it("returns metadata-only items for openai", async () => {
    const openaiSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://openai.com/research/new-paper</loc>
    <lastmod>2026-05-30</lastmod>
  </url>
</urlset>`;

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => openaiSitemapXml,
    });
    const result = await fetchSiteContent("openai", emptyState);
    expect(result.site).toBe("openai");
    expect(result.totalDiscovered).toBe(9);
  });

  it("marks items as new based on seenUrls", async () => {
    const stateWithSeen: WebState = {
      anthropic: {
        lastChecked: "2026-05-28T00:00:00.000Z",
        seenUrls: { "https://www.anthropic.com/news/announcement": "2026-05-30" },
      },
      openai: { lastChecked: "", seenUrls: {} },
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => sampleSitemapXml,
    });
    const result = await fetchSiteContent("anthropic", stateWithSeen);
    expect(result.totalDiscovered).toBe(2);
    expect(result.isFirstRun).toBe(false);
  });

  it("throws when sitemap fetch fails", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    await expect(fetchSiteContent("anthropic", emptyState)).rejects.toThrow("Network error");
  });

  it("returns WebFetchResult with correct shape", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => sampleSitemapXml,
    });
    const result = await fetchSiteContent("anthropic", emptyState);
    expect(result).toHaveProperty("site");
    expect(result).toHaveProperty("siteName");
    expect(result).toHaveProperty("isFirstRun");
    expect(result).toHaveProperty("newItems");
    expect(result).toHaveProperty("totalDiscovered");
  });
});
