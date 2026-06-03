import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { toUtcStr } from "./to-utc-str";

describe("toUtcStr", () => {
  it("returns correct UTC ISO string", () => {
    const date = DateTime.fromISO("2026-03-09T00:00:00Z");
    expect(toUtcStr(date)).toBe("2026-03-09 00:00");
  });

  it("formats time correctly", () => {
    const date = DateTime.fromISO("2026-03-09T14:30:00Z");
    expect(toUtcStr(date)).toBe("2026-03-09 14:30");
  });

  it("handles midnight correctly", () => {
    const date = DateTime.fromISO("2026-12-31T23:59:00Z");
    expect(toUtcStr(date)).toBe("2026-12-31 23:59");
  });
});
