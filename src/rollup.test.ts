import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { toWeekStr } from "./week-str";

describe("toWeekStr", () => {
  it("returns correct ISO week for a known date", () => {
    expect(toWeekStr(DateTime.fromISO("2026-03-09"))).toBe("2026-W11");
  });

  it("handles first week of year", () => {
    expect(toWeekStr(DateTime.fromISO("2026-01-05"))).toBe("2026-W02");
  });

  it("handles last week of year crossing into next year", () => {
    expect(toWeekStr(DateTime.fromISO("2025-12-29"))).toBe("2026-W01");
  });

  it("handles week 52/53", () => {
    const result = toWeekStr(DateTime.fromISO("2026-12-28"));
    expect(result).toMatch(/^\d{4}-W\d{2}$/);
  });

  it("pads single-digit week numbers", () => {
    const result = toWeekStr(DateTime.fromISO("2026-01-12"));
    expect(result).toBe("2026-W03");
  });
});
