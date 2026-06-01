import fs from "node:fs";
import path from "node:path";
import dotenvx from "@dotenvx/dotenvx";
import { DateTime } from "luxon";
import { marked } from "marked";
import { t } from "../utils";
import { PAGES_URL_DEFAULT } from "../utils/constants";
import { escapeXml } from "./escape-xml";
import { toRfc822 } from "./to-rfc822";

const reportLabel = (id: string): string => {
  const zh = t("zh");
  const en = t("en");
  switch (id) {
    case "ai-cli":
      return zh.reportLabelAiCli;
    case "ai-cli-en":
      return en.reportLabelAiCliEn;
    case "ai-agents":
      return zh.reportLabelAiAgents;
    case "ai-agents-en":
      return en.reportLabelAiAgentsEn;
    case "ai-web":
      return zh.reportLabelAiWeb;
    case "ai-web-en":
      return en.reportLabelAiWebEn;
    case "ai-trending":
      return zh.reportLabelAiTrending;
    case "ai-trending-en":
      return en.reportLabelAiTrendingEn;
    case "ai-hn":
      return zh.reportLabelAiHn;
    case "ai-hn-en":
      return en.reportLabelAiHnEn;
    case "ai-ph":
      return zh.reportLabelAiPh;
    case "ai-ph-en":
      return en.reportLabelAiPhEn;
    case "ai-arxiv":
      return zh.reportLabelAiArxiv;
    case "ai-arxiv-en":
      return en.reportLabelAiArxivEn;
    case "ai-hf":
      return zh.reportLabelAiHf;
    case "ai-hf-en":
      return en.reportLabelAiHfEn;
    case "ai-community":
      return zh.reportLabelAiCommunity;
    case "ai-community-en":
      return en.reportLabelAiCommunityEn;
    case "ai-weekly":
      return zh.reportLabelAiWeekly;
    case "ai-weekly-en":
      return en.reportLabelAiWeeklyEn;
    case "ai-monthly":
      return zh.reportLabelAiMonthly;
    case "ai-monthly-en":
      return en.reportLabelAiMonthlyEn;
    default:
      return id;
  }
};

const DIGESTS_DIR = "digests";
const MANIFEST_PATH = "manifest.json";
const FEED_PATH = "feed.xml";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REPORT_FILES = [
  "ai-cli",
  "ai-cli-en",
  "ai-agents",
  "ai-agents-en",
  "ai-web",
  "ai-web-en",
  "ai-trending",
  "ai-trending-en",
  "ai-hn",
  "ai-hn-en",
  "ai-ph",
  "ai-ph-en",
  "ai-arxiv",
  "ai-arxiv-en",
  "ai-hf",
  "ai-hf-en",
  "ai-community",
  "ai-community-en",
  "ai-weekly",
  "ai-weekly-en",
  "ai-monthly",
  "ai-monthly-en",
] as const;
const MAX_FEED_ITEMS = 30;

interface DateEntry {
  date: string;
  reports: string[];
}

interface Manifest {
  generated: string;
  dates: DateEntry[];
}

interface ReportContent {
  summary: string;
  fullHtml: string;
}

const getReportContent = async (date: string, report: string): Promise<ReportContent> => {
  const filePath = path.join(DIGESTS_DIR, date, `${report}.md`);

  try {
    const markdown = fs.readFileSync(filePath, "utf-8");
    const html = await marked.parse(markdown, { async: false });

    const textOnly = html
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const summary = textOnly.length > 500 ? `${textOnly.slice(0, 500)}...` : textOnly;

    const safeHtml = html.replace(/]]>/g, "]]]]><![CDATA[");

    return {
      summary: escapeXml(summary),
      fullHtml: `<![CDATA[${safeHtml}]]>`,
    };
  } catch {
    const label = reportLabel(report);
    const title = `${label} ${date}`;
    return {
      summary: escapeXml(title),
      fullHtml: `<![CDATA[${escapeXml(title)}]]>`,
    };
  }
};

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

  const manifest: Manifest = {
    generated: DateTime.now().toISO()!,
    dates: entries,
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
