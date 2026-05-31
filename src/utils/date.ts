/**

 * Date and timing utilities used across the pipeline.
 */

import { DateTime } from "luxon";

/** Convert a DateTime to a CST (UTC+8) date string like "2026-03-11". */
export const toCstDateStr = (date: DateTime = DateTime.now()): string => {
  return date.plus({ hours: 8 }).toFormat("yyyy-MM-dd");
};

/** Format a DateTime as a compact UTC string like "2026-03-11 00:00". */
export const toUtcStr = (date: DateTime = DateTime.now()): string => {
  return date.toUTC().toISO()!.slice(0, 16).replace("T", " ");
};

/** Promise-based delay. */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((r) => setTimeout(r, ms));
};
