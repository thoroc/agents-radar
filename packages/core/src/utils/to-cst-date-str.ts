import { DateTime } from "luxon";

export const toCstDateStr = (date: DateTime = DateTime.now()): string => {
  return date.plus({ hours: 8 }).toFormat("yyyy-MM-dd");
};
