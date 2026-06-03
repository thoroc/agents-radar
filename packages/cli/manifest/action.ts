import fs from "node:fs";
import path from "node:path";
import {
  DIGESTS_DIR,
  escapeXml,
  getReportContent,
  REPORT_FILES,
  reportLabel,
  toRfc822,
} from "@agents-radar/core/generate-manifest";
import { getPrimaryLang, PAGES_URL_DEFAULT, STRINGS, SUPPORTED_LOCALES } from "@agents-radar/core/utils";
import dotenvx from "@dotenvx/dotenvx";
import { DateTime } from "luxon";

const MANIFEST_PATH = "manifest.json";
const FEED_PATH = "feed.xml";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_FEED_ITEMS = 30;

interface DateEntry {
  date: string;
  reports: string[];
}

interface Manifest {
  generated: string;
  dates: DateEntry[];
  labels: Record<string, string>;
}

const buildLabels = (): Record<string, string> => {
  const labels: Record<string, string> = {};
  const baseIds = REPORT_FILES.filter((id) => !id.endsWith("-en"));
  for (const lang of SUPPORTED_LOCALES) {
    const s = STRINGS[lang];
    if (!s) continue;
    const suffix = lang === getPrimaryLang() ? "" : `.${lang}`;
    for (const id of baseIds) {
      const key = id + suffix;
      const base = id.startsWith("ai-") ? id.slice(3) : id;
      const localeKey = `reportLabelAi${base
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("")}` as keyof typeof s;
      labels[key] = (s[localeKey] as string) ?? key;
    }
  }
  return labels;
};

export interface GenerateManifestActionArgs {
  verbosity: number;
}

export type GenerateManifestDeps = {
  write?: (s: string) => void;
};

const scanDigestDirs = (): DateEntry[] =>
  fs
    .readdirSync(DIGESTS_DIR)
    .filter((name) => DATE_RE.test(name) && fs.statSync(path.join(DIGESTS_DIR, name)).isDirectory())
    .sort()
    .reverse()
    .map((date) => ({
      date,
      reports: REPORT_FILES.filter((r) => fs.existsSync(path.join(DIGESTS_DIR, date, `${r}.md`))),
    }))
    .filter((e) => e.reports.length > 0);

const buildFeedXml = async (entries: DateEntry[], siteUrl: string): Promise<string> => {
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
    const link = `${siteUrl}/#${date}/${report}`;
    const parts = date.split("-").map(Number);
    const pubDate = toRfc822(DateTime.utc(parts[0]!, parts[1]!, parts[2]!).toJSDate());
    const content = await getReportContent(date, report);
    itemXmlChunks.push(
      [
        "    <item>",
        `      <title>${escapeXml(`${label} ${date}`)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${content.summary}</description>`,
        `      <content:encoded>${content.fullHtml}</content:encoded>`,
        "    </item>",
      ].join("\n"),
    );
  }

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n` +
    `  <channel>\n` +
    `    <title>agents-radar</title>\n` +
    `    <link>${siteUrl}</link>\n` +
    `    <description>AI 开源生态每日简报 · Daily AI ecosystem digest</description>\n` +
    `    <language>zh-CN</language>\n` +
    `    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
    `    <lastBuildDate>${buildDate}</lastBuildDate>\n` +
    itemXmlChunks.join("\n") +
    `\n  </channel>\n` +
    `</rss>\n`
  );
};

export const generateManifestAction = async (
  args: GenerateManifestActionArgs,
  _deps: GenerateManifestDeps = {},
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> => {
  dotenvx.config({ quiet: true });
  const { verbosity } = args;
  const siteUrl = env.PAGES_URL ?? PAGES_URL_DEFAULT;

  const entries = scanDigestDirs();
  const manifest: Manifest = {
    generated: DateTime.now().toISO()!,
    dates: entries,
    labels: buildLabels(),
  };
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.error(`manifest.json updated: ${entries.length} dates`);

  const feedXml = await buildFeedXml(entries, siteUrl);
  fs.writeFileSync(FEED_PATH, feedXml);
  const feedCount = (feedXml.match(/<item>/g) ?? []).length;
  console.error(`feed.xml updated: ${feedCount} items`);

  if (verbosity >= 1) {
    console.error(`[manifest] ${feedCount} feed items, ${entries.length} dates`);
  }
};
