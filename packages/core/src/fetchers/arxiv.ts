/**
 * ArXiv AI papers fetched via the ArXiv API (Atom feed).
 *
 * Strategy: query cs.AI + cs.CL + cs.LG categories for the newest papers,
 * sorted by submission date, filtered to last 48h.
 */

import { DateTime } from "luxon";

export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  updated: string;
  categories: string[];
  url: string;
  pdfUrl: string;
}

export interface ArxivData {
  papers: ArxivPaper[];
  fetchSuccess: boolean;
}

const ARXIV_MAX_RESULTS = 50;
const API_URL = "https://export.arxiv.org/api/query";

/** ArXiv categories to search. */
const CATEGORIES = ["cs.AI", "cs.CL", "cs.LG"];

/** Delay between requests (ArXiv asks for 3s). */
const REQUEST_DELAY_MS = 3000;

const extractTag = (xml: string, tag: string): string => {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const m = xml.match(re);
  return m ? m[1]!.trim() : "";
};

const extractAllTags = (xml: string, tag: string): string[] => {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "g");
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    results.push(m[1]!.trim());
  }
  return results;
};

const extractAttr = (xml: string, tag: string, attr: string): string[] => {
  const re = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"[^>]*/?>`, "g");
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    results.push(m[1]!);
  }
  return results;
};

const extractLinkHref = (xml: string, rel: string): string => {
  const re = new RegExp(`<link[^>]*rel="${rel}"[^>]*href="([^"]*)"[^>]*/?>`, "g");
  const m = re.exec(xml);
  return m ? m[1]! : "";
};

const parseEntry = (entryXml: string): ArxivPaper | null => {
  const id = extractTag(entryXml, "id");
  if (!id) return null;

  const title = extractTag(entryXml, "title").replace(/\s+/g, " ");
  const summary = extractTag(entryXml, "summary").replace(/\s+/g, " ");
  const authors = extractAllTags(entryXml, "name");
  const published = extractTag(entryXml, "published");
  const updated = extractTag(entryXml, "updated");
  const categories = extractAttr(entryXml, "category", "term");

  const url = id; // ArXiv id IS the URL (e.g. http://arxiv.org/abs/...)
  const pdfUrl = extractLinkHref(entryXml, "related") || id.replace("/abs/", "/pdf/");

  return { id, title, summary, authors, published, updated, categories, url, pdfUrl };
};

const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchArxivData = async (): Promise<ArxivData> => {
  const seen = new Map<string, ArxivPaper>();

  for (let i = 0; i < CATEGORIES.length; i++) {
    const cat = CATEGORIES[i]!;
    if (i > 0) await sleep(REQUEST_DELAY_MS);

    try {
      const params = new URLSearchParams({
        search_query: `cat:${cat}`,
        sortBy: "submittedDate",
        sortOrder: "descending",
        max_results: String(ARXIV_MAX_RESULTS),
      });

      const resp = await fetch(`${API_URL}?${params}`, {
        headers: { "User-Agent": "agents-radar/1.0" },
      });

      if (!resp.ok) {
        console.error(`  [arxiv] ${cat}: HTTP ${resp.status}`);
        continue;
      }

      const xml = await resp.text();

      // Split into entries
      const entryBlocks = xml.split("<entry>").slice(1);
      for (const block of entryBlocks) {
        const paper = parseEntry(`<entry>${block}`);
        if (paper && !seen.has(paper.id)) {
          seen.set(paper.id, paper);
        }
      }

      console.error(`  [arxiv] ${cat}: ${entryBlocks.length} papers`);
    } catch (err) {
      console.error(`  [arxiv] ${cat}: ${err}`);
    }
  }

  // Filter to last 48h (ArXiv has a ~1-day publishing delay, so 24h would miss today's batch)
  const cutoff = DateTime.now().minus({ hours: 48 }).toMillis();
  const papers = [...seen.values()]
    .filter((p) => DateTime.fromISO(p.published).toMillis() > cutoff)
    .sort((a, b) => DateTime.fromISO(b.published).toMillis() - DateTime.fromISO(a.published).toMillis())
    .slice(0, ARXIV_MAX_RESULTS);

  console.error(`  [arxiv] ${papers.length} papers (from ${seen.size} unique)`);
  return { papers, fetchSuccess: papers.length > 0 };
};
