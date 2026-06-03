import type { DateTime } from "luxon";

const matchField = (pattern: string, value: number): boolean => {
  const p = pattern.trim();
  if (p === "*") return true;
  if (p.startsWith("*/")) {
    const step = Number.parseInt(p.slice(2), 10);
    return step > 0 && value % step === 0;
  }
  if (p.includes(",")) {
    return p.split(",").some((s) => matchField(s.trim(), value));
  }
  if (p.includes("-")) {
    const range = p.split("-");
    const start = Number(range[0]);
    const end = Number(range[1]);
    return value >= start && value <= end;
  }
  return Number.parseInt(p, 10) === value;
};

export const cronMatch = (expression: string, now: DateTime): boolean => {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return false;
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  if (!minute || !hour || !dayOfMonth || !month || !dayOfWeek) return false;

  return (
    matchField(minute, now.minute) &&
    matchField(hour, now.hour) &&
    matchField(dayOfMonth, now.day) &&
    matchField(month, now.month) &&
    matchField(dayOfWeek, now.weekday === 7 ? 0 : now.weekday)
  );
};
