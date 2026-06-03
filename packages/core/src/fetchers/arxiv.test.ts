import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchArxivData } from "./arxiv";

const makeArxivXml = (
  entries: Array<{ id: string; title: string; summary: string; published: string; updated: string }>,
) => `<?xml version="1.0"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  ${entries
    .map(
      (e) => `
  <entry>
    <id>${e.id}</id>
    <title>${e.title}</title>
    <summary>${e.summary}</summary>
    <published>${e.published}</published>
    <updated>${e.updated}</updated>
    <author><name>Author One</name></author>
    <author><name>Author Two</name></author>
    <link href="${e.id}" rel="alternate" type="text/html"/>
    <link href="${e.id.replace("/abs/", "/pdf/")}" rel="related" type="application/pdf"/>
    <category term="cs.AI" scheme="http://arxiv.org/schemas/atom"/>
    <category term="cs.LG" scheme="http://arxiv.org/schemas/atom"/>
  </entry>`,
    )
    .join("\n")}
</feed>`;

/** Returns an ISO date string N hours before now. */
const hoursAgo = (h: number): string => new Date(Date.now() - h * 3600 * 1000).toISOString();

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(globalThis, "setTimeout").mockImplementation((fn: (...args: unknown[]) => void) => {
    fn();
    return 0 as unknown as ReturnType<typeof setTimeout>;
  });
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    text: async () =>
      makeArxivXml([
        {
          id: "http://arxiv.org/abs/2605.12345",
          title: "Advances in AI Reasoning",
          summary: "We present a new approach to AI reasoning.",
          published: hoursAgo(2),
          updated: hoursAgo(2),
        },
      ]),
    json: async () => ({}),
  });
});

describe("fetchArxivData", () => {
  it("parses paper entries from valid XML response", async () => {
    const result = await fetchArxivData();
    expect(result.fetchSuccess).toBe(true);
    expect(result.papers).toHaveLength(1);
    expect(result.papers[0]!.id).toBe("http://arxiv.org/abs/2605.12345");
    expect(result.papers[0]!.title).toBe("Advances in AI Reasoning");
    expect(result.papers[0]!.summary).toBe("We present a new approach to AI reasoning.");
    expect(result.papers[0]!.authors).toEqual(["Author One", "Author Two"]);
    expect(result.papers[0]!.categories).toContain("cs.AI");
    expect(result.papers[0]!.categories).toContain("cs.LG");
    expect(result.papers[0]!.pdfUrl).toContain("/pdf/");
  });

  it("returns empty papers on network error", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));
    const result = await fetchArxivData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.papers).toHaveLength(0);
  });

  it("filters papers within the last 48 hours, excluding older ones", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () =>
        makeArxivXml([
          {
            id: "http://arxiv.org/abs/2605.11111",
            title: "Recent Paper",
            summary: "Recent paper summary",
            published: hoursAgo(2),
            updated: hoursAgo(2),
          },
          {
            id: "http://arxiv.org/abs/2605.22222",
            title: "Old Paper",
            summary: "Old paper summary",
            published: hoursAgo(96),
            updated: hoursAgo(96),
          },
        ]),
      json: async () => ({}),
    });
    const result = await fetchArxivData();
    expect(result.papers).toHaveLength(1);
    expect(result.papers[0]!.title).toBe("Recent Paper");
  });

  it("handles HTTP errors by skipping that category", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 503, text: async () => "", json: async () => ({}) })
      .mockResolvedValueOnce({
        ok: true,
        text: async () =>
          makeArxivXml([
            {
              id: "http://arxiv.org/abs/2605.33333",
              title: "From Second Category",
              summary: "Summary",
              published: hoursAgo(2),
              updated: hoursAgo(2),
            },
          ]),
        json: async () => ({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () =>
          makeArxivXml([
            {
              id: "http://arxiv.org/abs/2605.44444",
              title: "From Third Category",
              summary: "Summary",
              published: hoursAgo(2),
              updated: hoursAgo(2),
            },
          ]),
        json: async () => ({}),
      });
    const result = await fetchArxivData();
    expect(result.papers).toHaveLength(2);
  });

  it("deduplicates papers with same ID across categories", async () => {
    const commonId = "http://arxiv.org/abs/2605.55555";
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () =>
        makeArxivXml([
          {
            id: commonId,
            title: "Duplicate Paper",
            summary: "Appears in multiple categories",
            published: hoursAgo(2),
            updated: hoursAgo(2),
          },
        ]),
      json: async () => ({}),
    });
    const result = await fetchArxivData();
    const uniqueIds = new Set(result.papers.map((p) => p.id));
    expect(uniqueIds.size).toBe(1);
  });

  it("handles entries with missing id field", async () => {
    const xml = `<?xml version="1.0"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <title>No ID</title>
    <summary>Missing ID</summary>
    <published>${hoursAgo(2)}</published>
    <updated>${hoursAgo(2)}</updated>
    <author><name>Author</name></author>
  </entry>
</feed>`;
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => xml,
      json: async () => ({}),
    });
    const result = await fetchArxivData();
    expect(result.fetchSuccess).toBe(false);
    expect(result.papers).toHaveLength(0);
  });

  it("cleans whitespace from title and summary", async () => {
    const xml = `<?xml version="1.0"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>http://arxiv.org/abs/2605.66666</id>
    <title>  A   Title With   Extra   Spaces  </title>
    <summary>  A   Summary With\nNewlines  </summary>
    <published>${hoursAgo(2)}</published>
    <updated>${hoursAgo(2)}</updated>
    <author><name>Author</name></author>
  </entry>
</feed>`;
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => xml,
      json: async () => ({}),
    });
    const result = await fetchArxivData();
    expect(result.papers[0]!.title).toBe("A Title With Extra Spaces");
    expect(result.papers[0]!.summary).toBe("A Summary With Newlines");
  });
});
