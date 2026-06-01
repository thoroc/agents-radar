import { DateTime } from "luxon";

export const toWeekStr = (dt: DateTime = DateTime.now()): string => {
  return `${dt.weekYear}-W${String(dt.weekNumber).padStart(2, "0")}`;
};
