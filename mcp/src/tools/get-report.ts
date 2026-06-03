import { z } from "zod";
import { fetchReport } from "../fetchers";
import type { Tool, ToolHandler } from "../types";

const GetReportArgsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  type: z.string().min(1, "Type is required"),
});

const getReportHandler: ToolHandler = async (args) => {
  const { date, type } = GetReportArgsSchema.parse(args);
  return fetchReport(date, type);
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
