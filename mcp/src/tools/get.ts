import { z } from "zod";
import { fetchManifest, fetchReport } from "../fetchers";
import { REPORT_LABELS } from "../labels";
import type { Tool, ToolHandler } from "../types";

const GetReportArgsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  type: z.string().min(1, "Type is required"),
});

const GetLatestArgsSchema = z.object({
  type: z.string().min(1).default("ai-cli-en"),
});

const getReportHandler: ToolHandler = async (args) => {
  const { date, type } = GetReportArgsSchema.parse(args);
  return fetchReport(date, type);
};

const getLatestHandler: ToolHandler = async (args) => {
  const { type } = GetLatestArgsSchema.parse(args);
  const { dates } = await fetchManifest();
  for (const { date, reports } of dates) {
    if (reports.includes(type)) {
      const content = await fetchReport(date, type);
      return `# ${date} — ${REPORT_LABELS[type] ?? type}\n\n${content}`;
    }
  }
  throw new Error(`No report found for type: ${type}`);
};

export const getReportTool: Tool = {
  definition: {
    name: "get_report",
    description: "Fetch the full content of a specific agents-radar digest report.",
    inputSchema: {
      type: "object",
      properties: {
        date: { type: "string", description: "Date in YYYY-MM-DD format" },
        type: {
          type: "string",
          description:
            "Report type: ai-cli-en, ai-agents-en, ai-web-en, ai-trending-en, ai-hn-en, ai-weekly-en, ai-monthly-en (drop -en suffix for Chinese versions)",
        },
      },
      required: ["date", "type"],
    },
  },
  handler: getReportHandler,
};

export const getLatestTool: Tool = {
  definition: {
    name: "get_latest",
    description: "Fetch the most recent available report of a given type.",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          description: "Report type (default: ai-cli-en). Use list_reports to see all available types.",
        },
      },
    },
  },
  handler: getLatestHandler,
};
