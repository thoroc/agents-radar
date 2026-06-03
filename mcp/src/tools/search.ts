import { z } from "zod";
import { fetchManifest, fetchReport } from "../fetchers";
import type { Tool, ToolHandler } from "../types";

const SearchArgsSchema = z.object({
  query: z.string().min(1, "Query is required"),
  days: z.number().int().min(1).max(14).default(7),
});

const searchHandler: ToolHandler = async (args) => {
  const { query, days } = SearchArgsSchema.parse(args);
  const lowerQuery = query.toLowerCase();

  const { dates } = await fetchManifest();
  const slice = dates.slice(0, days);

  const results: Array<{ date: string; type: string; excerpts: string }> = [];

  await Promise.all(
    slice.map(async ({ date, reports }) => {
      const targets = reports.filter(
        (r) => !r.endsWith("-en") && !r.includes("weekly") && !r.includes("monthly"),
      );
      await Promise.all(
        targets.map(async (type) => {
          try {
            const content = await fetchReport(date, type);
            if (!content.toLowerCase().includes(lowerQuery)) return;
            const excerpts = content
              .split("\n")
              .filter((l) => l.toLowerCase().includes(lowerQuery))
              .slice(0, 3)
              .map((l) => `  > ${l.trim()}`)
              .join("\n");
            results.push({ date, type, excerpts });
          } catch (err) {
            console.warn(`[search] Skipping unavailable report: ${date}/${type} — ${err}`);
          }
        }),
      );
    }),
  );

  if (results.length === 0) {
    return `No matches for "${query}" in the last ${days} day(s).`;
  }
  const formatted = results.map((r) => `📄 ${r.date} / ${r.type}:\n${r.excerpts}`).join("\n\n");
  return `Found "${query}" in ${results.length} report(s):\n\n${formatted}`;
};

export const searchTool: Tool = {
  definition: {
    name: "search",
    description: "Search for a keyword or phrase across recent agents-radar digest reports.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword or phrase to search for" },
        days: {
          type: "number",
          description: "Number of recent days to search (default: 7, max: 14)",
        },
      },
      required: ["query"],
    },
  },
  handler: searchHandler,
};
