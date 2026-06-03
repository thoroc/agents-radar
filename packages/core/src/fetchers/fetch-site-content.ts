import { DateTime } from "luxon";
import { sleep } from "../utils";
import { extractText } from "./extract-text";
import { extractTitle } from "./extract-title";
import { isSitemapIndex } from "./is-sitemap-index";
import { parseSitemapUrls } from "./parse-sitemap-urls";
import { titleFromUrl } from "./title-from-url";
import { urlCategory } from "./url-category";
import type { SiteConfig, WebFetchResult, WebPageItem, WebState } from "./web-state-types";

const SITE_CONFIGS: Record<"anthropic" | "openai", SiteConfig> = {
  anthropic: {
    name: "Anthropic (Claude)",
    sitemapUrl: "https://www.anthropic.com/sitemap.xml",
    prefixes: ["/news/", "/research/", "/engineering/", "/learn/"],
  },
  openai: {
    name: "OpenAI",
    sitemapUrl: "https://openai.com/sitemap.xml",
    subSitemapNames: [
      "research",
      "publication",
      "release",
      "company",
      "engineering",
      "milestone",
      "learn-guides",
      "safety",
      "product",
    ],
    subSitemapTemplate: "https://openai.com/sitemap.xml/{name}/",
    metadataOnly: true,
  },
};

const MAX_CONTENT_FETCH_FIRST_RUN = 25;
const FETCH_DELAY_MS = 300;
const FETCH_TIMEOUT_MS = 10_000;

const WEB_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; agents-radar/1.0; +https://github.com/search?q=agents-radar)",
  Accept: "text/html,application/xml,text/xml,*/*",
  "Accept-Language": "en-US,en;q=0.9",
};

const httpGet = async (url: string): Promise<string> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const resp = await fetch(url, { headers: WEB_HEADERS, signal: controller.signal });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.text();
  } finally {
    clearTimeout(timer);
  }
};

const discoverUrls = async (
  site: "anthropic" | "openai",
): Promise<Array<{ loc: string; lastmod?: string }>> => {
  const cfg = SITE_CONFIGS[site];
  const results: Array<{ loc: string; lastmod?: string }> = [];

  if (cfg.subSitemapNames && cfg.subSitemapTemplate) {
    for (const name of cfg.subSitemapNames) {
      const subUrl = cfg.subSitemapTemplate.replace("{name}", name);
      try {
        const xml = await httpGet(subUrl);
        results.push(...parseSitemapUrls(xml));
        await sleep(100);
      } catch (err) {
        console.error(`  [web/${site}] sub-sitemap "${name}" failed: ${err}`);
      }
    }
  } else {
    const xml = await httpGet(cfg.sitemapUrl);
    const all = isSitemapIndex(xml) ? [] : parseSitemapUrls(xml);

    const prefixes = cfg.prefixes ?? [];
    results.push(
      ...all.filter(({ loc }) => {
        try {
          return prefixes.some((p) => new URL(loc).pathname.startsWith(p));
        } catch {
          return false;
        }
      }),
    );
  }

  return results;
};

export const fetchSiteContent = async (
  site: "anthropic" | "openai",
  state: WebState,
): Promise<WebFetchResult> => {
  const cfg = SITE_CONFIGS[site];
  const siteState = state[site];
  const isFirstRun = Object.keys(siteState.seenUrls).length === 0;

  console.error(`  [web/${site}] Discovering URLs from sitemap...`);
  const allDiscovered = await discoverUrls(site);
  console.error(`  [web/${site}] Discovered ${allDiscovered.length} URLs`);

  allDiscovered.sort((a, b) => {
    if (!a.lastmod && !b.lastmod) return 0;
    if (!a.lastmod) return 1;
    if (!b.lastmod) return -1;
    return b.lastmod.localeCompare(a.lastmod);
  });

  const newUrls = allDiscovered.filter(({ loc, lastmod }) => {
    const prev = siteState.seenUrls[loc];
    if (!prev) return true;
    if (!cfg.metadataOnly && lastmod && lastmod > prev) return true;
    return false;
  });

  const toFetch = isFirstRun ? newUrls.slice(0, MAX_CONTENT_FETCH_FIRST_RUN) : newUrls;

  console.error(
    `  [web/${site}] ${isFirstRun ? "First run" : "Incremental"}: ` +
      `${newUrls.length} new URLs, fetching content for ${toFetch.length}`,
  );

  const items: WebPageItem[] = [];
  if (cfg.metadataOnly) {
    for (const { loc, lastmod } of toFetch) {
      items.push({
        url: loc,
        title: titleFromUrl(loc),
        lastmod: lastmod ?? "",
        content: "",
        site,
        category: urlCategory(loc),
      });
    }
  } else {
    for (const { loc, lastmod } of toFetch) {
      try {
        const html = await httpGet(loc);
        items.push({
          url: loc,
          title: extractTitle(html),
          lastmod: lastmod ?? "",
          content: extractText(html),
          site,
          category: urlCategory(loc),
        });
      } catch (err) {
        console.error(`  [web/${site}] Failed to fetch ${loc}: ${err}`);
      }
      await sleep(FETCH_DELAY_MS);
    }
  }

  for (const { loc, lastmod } of allDiscovered) {
    siteState.seenUrls[loc] = lastmod ?? "seen";
  }
  siteState.lastChecked = DateTime.now().toISO()!;

  return {
    site,
    siteName: cfg.name,
    isFirstRun,
    newItems: items,
    totalDiscovered: allDiscovered.length,
  };
};
