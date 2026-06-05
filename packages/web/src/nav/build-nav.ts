import type { ManifestEntry } from "../types";
import { buildMonthGroup } from "./build-month-group";

export const buildNav = (
  dates: ManifestEntry[],
  manifestLabels: Record<string, string>,
  onLoad: (date: string, report: string) => void,
): void => {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const months = new Map<string, ManifestEntry[]>();
  dates.forEach((entry) => {
    const month = entry.date.slice(0, 7);
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push(entry);
  });

  let isFirstMonth = true;
  const isFirstDateRef = { value: true };
  months.forEach((entries, month) => {
    nav.appendChild(buildMonthGroup(month, entries, isFirstMonth, isFirstDateRef, manifestLabels, onLoad));
    isFirstMonth = false;
  });
};
