import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { DIGESTS_DIR } from "./constants";
import { escapeXml } from "./escape-xml";
import { reportLabel } from "./report-label";

interface ReportContent {
  summary: string;
  fullHtml: string;
}

export const getReportContent = async (date: string, report: string): Promise<ReportContent> => {
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
