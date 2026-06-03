import { z } from "zod";
import { fetchManifest, fetchReport } from "../fetchers";
import { REPORT_LABELS } from "../labels";
import type { Tool, ToolHandler } from "../types";

const GetLatestArgsSchema = z.object({
  type: z.string().min(1).default("ai-cli-en"),
});

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
