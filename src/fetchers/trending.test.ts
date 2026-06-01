import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchTrendingData } from "./trending";

const sampleTrendingHtml = `
<article class="Box-row">
  <h2><a href="/owner/repo-one">repo-one</a></h2>
  <p class="col-9">First trending repo</p>
  <span itemprop="programmingLanguage">TypeScript</span>
  1,234 stars today
  <a href="/owner/repo-one/stargazers"><svg/> 56,789</a>
  <a href="/owner/repo-one/forks"><svg/> 1,234</a>
</article>
<article class="Box-row">
  <h2><a href="/owner/repo-two">repo-two</a></h2>
  <p class="col-9">Second trending repo</p>
  <span itemprop="programmingLanguage">Python</span>
  567 stars today
  <a href="/owner/repo-two/stargazers"><svg/> 12,345</a>
  <a href="/owner/repo-two/forks"><svg/> 567</a>
</article>
`;

const sampleSearchResponse = {
  items: [
    {
      full_name: "ai-org/llm-tool",
      description: "An LLM tool",
      language: "Rust",
      stargazers_count: 5000,
      pushed_at: "2026-05-30T12:00:00Z",
      html_url: "https://github.com/ai-org/llm-tool",
    },
    {
      full_name: "ai-org/agent-framework",
      description: "AI agent framework",
      language: "Python",
      stargazers_count: 3200,
      pushed_at: "2026-05-29T10:00:00Z",
      html_url: "https://github.com/ai-org/agent-framework",
    },
  ],
};

const buildMockFetch = (htmlResponse?: string, jsonResponse?: unknown) => {
  return vi.fn().mockImplementation((url: string) => {
    if (url.includes("github.com/trending")) {
      return Promise.resolve({
        ok: true,
        text: async () => htmlResponse ?? "",
        json: async () => ({}),
      });
    }
    return Promise.resolve({
      ok: true,
      json: async () => jsonResponse ?? { items: [] },
      text: async () => "",
    });
  });
};

beforeEach(() => {
  vi.restoreAllMocks();
  process.env.GITHUB_TOKEN = "test-token";
});

afterEach(() => {
  delete process.env.GITHUB_TOKEN;
});

describe("fetchTrendingData", () => {
  it("returns trendingRepos and searchRepos on success", async () => {
    globalThis.fetch = buildMockFetch(sampleTrendingHtml, sampleSearchResponse);
    const result = await fetchTrendingData();
    expect(result.trendingRepos).toHaveLength(2);
    expect(result.trendingRepos[0]!.fullName).toBe("owner/repo-one");
    expect(result.trendingRepos[0]!.todayStars).toBe(1234);
    expect(result.trendingRepos[0]!.totalStars).toBe(56789);
    expect(result.trendingRepos[0]!.forks).toBe(1234);
    expect(result.trendingRepos[0]!.language).toBe("TypeScript");
    expect(result.trendingRepos[0]!.description).toBe("First trending repo");
    expect(result.trendingFetchSuccess).toBe(true);
    expect(result.searchRepos).toHaveLength(2);
    expect(result.searchRepos[0]!.fullName).toBe("ai-org/llm-tool");
    expect(result.searchRepos[0]!.searchQuery).toBe("llm");
  });

  it("returns empty trending when HTML fetch fails", async () => {
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("github.com/trending")) {
        return Promise.resolve({ ok: false, status: 429, json: async () => ({}), text: async () => "" });
      }
      return Promise.resolve({ ok: true, json: async () => sampleSearchResponse, text: async () => "" });
    });
    const result = await fetchTrendingData();
    expect(result.trendingFetchSuccess).toBe(false);
    expect(result.trendingRepos).toHaveLength(0);
    expect(result.searchRepos).toHaveLength(2);
  });

  it("returns empty search repos when search API fails", async () => {
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("github.com/trending")) {
        return Promise.resolve({ ok: true, text: async () => sampleTrendingHtml, json: async () => ({}) });
      }
      return Promise.resolve({ ok: false, status: 403, json: async () => ({}), text: async () => "" });
    });
    const result = await fetchTrendingData();
    expect(result.trendingFetchSuccess).toBe(true);
    expect(result.trendingRepos).toHaveLength(2);
    expect(result.searchRepos).toHaveLength(0);
  });

  it("handles malformed HTML gracefully", async () => {
    globalThis.fetch = buildMockFetch("<html><body>Not a trending page</body></html>", sampleSearchResponse);
    const result = await fetchTrendingData();
    expect(result.trendingFetchSuccess).toBe(false);
    expect(result.trendingRepos).toHaveLength(0);
    expect(result.searchRepos).toHaveLength(2);
  });

  it("handles network error on HTML fetch", async () => {
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("github.com/trending")) {
        return Promise.reject(new Error("Network error"));
      }
      return Promise.resolve({ ok: true, json: async () => sampleSearchResponse, text: async () => "" });
    });
    const result = await fetchTrendingData();
    expect(result.trendingFetchSuccess).toBe(false);
    expect(result.trendingRepos).toHaveLength(0);
  });

  it("deduplicates search repos across queries", async () => {
    const responseWithDup = {
      items: [
        {
          full_name: "ai-org/llm-tool",
          description: "An LLM tool",
          language: "Rust",
          stargazers_count: 5000,
          pushed_at: "2026-05-30T12:00:00Z",
          html_url: "https://github.com/ai-org/llm-tool",
        },
      ],
    };
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes("github.com/trending")) {
        return Promise.resolve({ ok: true, text: async () => sampleTrendingHtml, json: async () => ({}) });
      }
      return Promise.resolve({ ok: true, json: async () => responseWithDup, text: async () => "" });
    });
    const result = await fetchTrendingData();
    expect(result.searchRepos).toHaveLength(1);
  });

  it("parses trending repo with missing fields as defaults", async () => {
    const minimalHtml = `
      <article class="Box-row">
        <h2><a href="/owner/minimal">minimal</a></h2>
      </article>
    `;
    globalThis.fetch = buildMockFetch(minimalHtml, { items: [] });
    const result = await fetchTrendingData();
    expect(result.trendingRepos).toHaveLength(1);
    expect(result.trendingRepos[0]!.fullName).toBe("owner/minimal");
    expect(result.trendingRepos[0]!.description).toBe("");
    expect(result.trendingRepos[0]!.language).toBe("");
    expect(result.trendingRepos[0]!.todayStars).toBe(0);
    expect(result.trendingRepos[0]!.totalStars).toBe(0);
    expect(result.trendingRepos[0]!.forks).toBe(0);
  });
});
