import fs from "node:fs";
import path from "node:path";
import dotenvx from "@dotenvx/dotenvx";
import { DateTime } from "luxon";
import { SUPPORTED_LOCALES, t } from "../utils";
import { PAGES_URL_DEFAULT } from "../utils/constants";
import { DIGESTS_DIR } from "./constants";
import { escapeXml } from "./escape-xml";
import { getReportContent } from "./get-report-content";
import { reportLabel } from "./report-label";
import { toRfc822 } from "./to-rfc822";

const MANIFEST_PATH = "manifest.json";
const FEED_PATH = "feed.xml";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REPORT_FILES = [
  "ai-cli",
  "ai-cli.en-US",
  "ai-agents",
  "ai-agents.en-US",
  "ai-web",
  "ai-web.en-US",
  "ai-trending",
  "ai-trending.en-US",
  "ai-hn",
  "ai-hn.en-US",
  "ai-ph",
  "ai-ph.en-US",
  "ai-arxiv",
  "ai-arxiv.en-US",
  "ai-hf",
  "ai-hf.en-US",
  "ai-community",
  "ai-community.en-US",
  "ai-weekly",
  "ai-weekly.en-US",
  "ai-monthly",
  "ai-monthly.en-US",
] as const;
const MAX_FEED_ITEMS = 30;

interface DateEntry {
  date: string;
  reports: string[];
}

interface Manifest {
  generated: string;
  dates: DateEntry[];
  labels: Record<string, Record<string, string>>;
}

export interface GenerateManifestActionArgs {
  verbosity: number;
}

export type GenerateManifestDeps = {
  write?: (s: string) => void;
};

export const generateManifestAction = async (
  args: GenerateManifestActionArgs,
  _deps: GenerateManifestDeps = {},
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> => {
  dotenvx.config({ quiet: true });
  const { verbosity } = args;
  const siteUrl = env.PAGES_URL ?? PAGES_URL_DEFAULT;
  const entries = fs
    .readdirSync(DIGESTS_DIR)
    .filter((name) => DATE_RE.test(name) && fs.statSync(path.join(DIGESTS_DIR, name)).isDirectory())
    .sort()
    .reverse()
    .map((date) => {
      const reports = REPORT_FILES.filter((r) => fs.existsSync(path.join(DIGESTS_DIR, date, `${r}.md`)));
      return { date, reports };
    })
    .filter((e) => e.reports.length > 0);

  const REPORT_BASES = [...new Set(REPORT_FILES.map((r) => r.replace(/\.en-US$/, "")))];

  t("en-US");
  const labels: Record<string, Record<string, string>> = {};
  for (const base of REPORT_BASES) {
    const langLabels: Record<string, string> = {};
    for (const lang of SUPPORTED_LOCALES) {
      langLabels[lang] = reportLabel(`${base}${lang === "zh-CN" ? "" : ".en-US"}`);
    }
    labels[base] = langLabels;
  }

  const manifest: Manifest = {
    generated: DateTime.now().toISO()!,
    dates: entries,
    labels,
  };

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.error(`manifest.json updated: ${entries.length} dates`);

  const feedItems: Array<{ date: string; report: string }> = [];
  outer: for (const entry of entries) {
    for (const report of entry.reports) {
      feedItems.push({ date: entry.date, report });
      if (feedItems.length >= MAX_FEED_ITEMS) break outer;
    }
  }

  const buildDate = toRfc822(DateTime.now().toJSDate());

  const itemXmlChunks: string[] = [];
  for (const { date, report } of feedItems) {
    const label = reportLabel(report);
    const title = `${label} ${date}`;
    const link = `${siteUrl}/#${date}/${report}`;
    const parts = date.split("-").map(Number);
    const pubDate = toRfc822(DateTime.utc(parts[0]!, parts[1]!, parts[2]!).toJSDate());
    const content = await getReportContent(date, report);
    itemXmlChunks.push(
      [
        "    <item>",
        `      <title>${escapeXml(title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${content.summary}</description>`,
        `      <content:encoded>${content.fullHtml}</content:encoded>`,
        "    </item>",
      ].join("\n"),
    );
  }
  const itemsXml = itemXmlChunks.join("\n");

  const feedXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n` +
    `  <channel>\n` +
    `    <title>agents-radar</title>\n` +
    `    <link>${siteUrl}</link>\n` +
    `    <description>AI 开源生态每日简报 · Daily AI ecosystem digest</description>\n` +
    `    <language>zh-CN</language>\n` +
    `    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
    `    <lastBuildDate>${buildDate}</lastBuildDate>\n` +
    itemsXml +
    `\n  </channel>\n` +
    `</rss>\n`;

  fs.writeFileSync(FEED_PATH, feedXml);
  console.error(`feed.xml updated: ${feedItems.length} items`);

  if (verbosity >= 1) {
    console.error(`[manifest] ${feedItems.length} feed items, ${entries.length} dates`);
  }
};
