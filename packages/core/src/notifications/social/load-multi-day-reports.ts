import { getRecentDates } from "./get-recent-dates";
import { loadReports } from "./load-reports";
import { FsDeps } from "./types";

export const loadMultiDayReports = (
  days: number,
  deps: FsDeps,
  truncate: number,
): { dateRange: string; content: string } => {
  const dates = getRecentDates(days, deps);
  if (dates.length === 0) throw new Error("No digest directories found");

  const sections: string[] = [];
  for (const date of dates) {
    const dayContent = loadReports(date, deps, truncate);
    if (dayContent) {
      sections.push(`# ${date}\n\n${dayContent}`);
    }
  }
  if (sections.length === 0) throw new Error(`No reports found in the last ${days} days`);

  const dateRange = `${dates[dates.length - 1]} ~ ${dates[0]}`;
  return { dateRange, content: sections.join("\n\n===\n\n") };
};