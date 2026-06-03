import { DateTime } from "luxon";
import { MAX_FEED_ITEMS } from "./constants";
import { escapeXml } from "./escape-xml";
import { getReportContent } from "./get-report-content";
import { reportLabel } from "./report-label";
import { toRfc822 } from "./to-rfc822";
import type { DateEntry } from "./types";

export const buildFeedXml = async (entries: DateEntry[], siteUrl: string): Promise<string> => {
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
