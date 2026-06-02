import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { cronMatch } from "./cron";

const utc = (y: number, M: number, d: number, h: number, m: number): DateTime => DateTime.utc(y, M, d, h, m);

describe("cronMatch", () => {
  it("matches * * * * * (always)", () => {
    expect(cronMatch("* * * * *", utc(2026, 3, 9, 14, 30))).toBe(true);
  });

  it("matches exact minute", () => {
    expect(cronMatch("30 * * * *", utc(2026, 3, 9, 14, 30))).toBe(true);
    expect(cronMatch("30 * * * *", utc(2026, 3, 9, 14, 31))).toBe(false);
  });

  it("matches exact hour", () => {
    expect(cronMatch("* 14 * * *", utc(2026, 3, 9, 14, 0))).toBe(true);
    expect(cronMatch("* 14 * * *", utc(2026, 3, 9, 15, 0))).toBe(false);
  });

  it("matches step values (*/N)", () => {
    expect(cronMatch("*/15 * * * *", utc(2026, 3, 9, 14, 0))).toBe(true);
    expect(cronMatch("*/15 * * * *", utc(2026, 3, 9, 14, 15))).toBe(true);
    expect(cronMatch("*/15 * * * *", utc(2026, 3, 9, 14, 20))).toBe(false);
  });

  it("matches comma-separated values", () => {
    expect(cronMatch("0,30 * * * *", utc(2026, 3, 9, 14, 0))).toBe(true);
    expect(cronMatch("0,30 * * * *", utc(2026, 3, 9, 14, 30))).toBe(true);
    expect(cronMatch("0,30 * * * *", utc(2026, 3, 9, 14, 15))).toBe(false);
  });

  it("matches ranges (N-M)", () => {
    expect(cronMatch("* 9-17 * * *", utc(2026, 3, 9, 12, 0))).toBe(true);
    expect(cronMatch("* 9-17 * * *", utc(2026, 3, 9, 8, 0))).toBe(false);
    expect(cronMatch("* 9-17 * * *", utc(2026, 3, 9, 18, 0))).toBe(false);
  });

  it("matches specific day of month", () => {
    expect(cronMatch("* * 15 * *", utc(2026, 3, 15, 14, 0))).toBe(true);
    expect(cronMatch("* * 15 * *", utc(2026, 3, 16, 14, 0))).toBe(false);
  });

  it("matches specific month", () => {
    expect(cronMatch("* * * 3 *", utc(2026, 3, 9, 14, 0))).toBe(true);
    expect(cronMatch("* * * 4 *", utc(2026, 3, 9, 14, 0))).toBe(false);
  });

  it("matches day of week (0=Sunday, 7 mapped to 0)", () => {
    // 2026-03-09 is Monday (weekday=1)
    expect(cronMatch("* * * * 1", utc(2026, 3, 9, 14, 0))).toBe(true);
    expect(cronMatch("* * * * 0", utc(2026, 3, 9, 14, 0))).toBe(false);
  });

  it("returns false for invalid expression length", () => {
    expect(cronMatch("* * * *", utc(2026, 3, 9, 14, 0))).toBe(false);
    expect(cronMatch("* * * * * *", utc(2026, 3, 9, 14, 0))).toBe(false);
  });

  it("handles common schedule pattern (daily at midnight)", () => {
    expect(cronMatch("0 0 * * *", utc(2026, 3, 9, 0, 0))).toBe(true);
    expect(cronMatch("0 0 * * *", utc(2026, 3, 9, 0, 1))).toBe(false);
  });

  it("handles weekly schedule (Monday 1am)", () => {
    // 2026-03-09 is Monday
    expect(cronMatch("0 1 * * 1", utc(2026, 3, 9, 1, 0))).toBe(true);
    expect(cronMatch("0 1 * * 1", utc(2026, 3, 9, 2, 0))).toBe(false);
    // Tuesday shouldn't match
    expect(cronMatch("0 1 * * 1", utc(2026, 3, 10, 1, 0))).toBe(false);
  });

  it("handles monthly schedule (1st at 2am)", () => {
    expect(cronMatch("0 2 1 * *", utc(2026, 4, 1, 2, 0))).toBe(true);
    expect(cronMatch("0 2 1 * *", utc(2026, 4, 2, 2, 0))).toBe(false);
  });
});
