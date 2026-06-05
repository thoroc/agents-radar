import type { ManifestEntry } from "../types";

const BASE_URL = "https://raw.githubusercontent.com/thoroc/agents-radar/main/digests";

export const buildSearchIndex = async (dates: ManifestEntry[]): Promise<Map<string, string>> => {
  const index = new Map<string, string>();
  await Promise.all(
    dates.map(async ({ date, reports }) => {
      const chunks = await Promise.all(
        reports.map(async (report) => {
          try {
            const res = await fetch(`${BASE_URL}/${date}/${report}.md`);
            if (!res.ok) return "";
            return await res.text();
          } catch {
            return "";
          }
        }),
      );
      index.set(date, chunks.join("\n").toLowerCase());
    }),
  );
  return index;
};
