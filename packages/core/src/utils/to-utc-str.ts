import { DateTime } from "luxon";

export const toUtcStr = (date: DateTime = DateTime.now()): string => {
  return date.toUTC().toISO()!.slice(0, 16).replace("T", " ");
};
