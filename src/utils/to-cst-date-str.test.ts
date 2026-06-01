import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { toCstDateStr } from "./to-cst-date-str";

describe("toCstDateStr", () => {
  it("returns correct CST date string", () => {
    const date = DateTime.fromISO("2026-03-09T00:00:00Z");
    expect(toCstDateStr(date)).toBe("2026-03-09");
  });

  it("handles date crossing midnight in CST", () => {
    const date = DateTime.fromISO("2026-03-09T16:00:00Z");
    expect(toCstDateStr(date)).toBe("2026-03-10");
  });

  it("handles date near end of year", () => {
    const date = DateTime.fromISO("2026-12-31T16:00:00Z");
    expect(toCstDateStr(date)).toBe("2027-01-01");
  });
});
