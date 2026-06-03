import { z } from "zod";
import { fetchManifest } from "../fetchers";
import { REPORT_LABELS } from "../labels";
import type { Tool, ToolHandler } from "../types";

const ListArgsSchema = z.object({
  days: z.number().int().min(1).max(30).default(7),
});

const listReportsHandler: ToolHandler = async (args) => {
  const { days } = ListArgsSchema.parse(args);
  const { dates } = await fetchManifest();
  const slice = dates.slice(0, days);

  const lines = slice.map(({ date, reports }) => {
    const labels = reports.map((r) => `${r} (${REPORT_LABELS[r] ?? r})`).join(", ");
    return `• ${date}: ${labels}`;
  });

  return `Available reports — last ${slice.length} day(s):\n\n${lines.join("\n")}`;
};

export const listReportsTool: Tool = {
  definition: {
    name: "list_reports",
    description:
      "List available digest dates and report types from agents-radar. Returns the last N days of available reports.",
    inputSchema: {
      type: "object",
      properties: {
        days: {
          type: "number",
          description: "Number of recent days to list (default: 7, max: 30)",
        },
      },
    },
  },
  handler: listReportsHandler,
};
