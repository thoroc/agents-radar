import { afterEach, describe, expect, it, vi } from "vitest";
import { loadMultiDayReports } from "./load-multi-day-reports";
import * as getRecentDatesModule from "./get-recent-dates";
import * as loadReportsModule from "./load-reports";

const fakeDeps = {
  readdirSync: vi.fn() as never,
  readFileSync: vi.fn() as never,
  writeFileSync: vi.fn() as never,
  mkdirSync: vi.fn() as never,
  existsSync: vi.fn() as never,
};

describe("loadMultiDayReports", () => {
  afterEach(() => vi.restoreAllMocks());
  it("returns combined content and date range", () => {
    vi.spyOn(getRecentDatesModule, "getRecentDates").mockReturnValue(["2026-01-03", "2026-01-02"]);
    vi.spyOn(loadReportsModule, "loadReports").mockReturnValue("report content");
    const { dateRange, content } = loadMultiDayReports(2, fakeDeps, 3000);
    expect(dateRange).toBe("2026-01-02 ~ 2026-01-03");
    expect(content).toContain("# 2026-01-03");
    expect(content).toContain("report content");
  });

  it("throws when no digest directories found", () => {
    vi.spyOn(getRecentDatesModule, "getRecentDates").mockReturnValue([]);
    expect(() => loadMultiDayReports(3, fakeDeps, 3000)).toThrow("No digest directories found");
  });

  it("throws when all days have empty reports", () => {
    vi.spyOn(getRecentDatesModule, "getRecentDates").mockReturnValue(["2026-01-01"]);
    vi.spyOn(loadReportsModule, "loadReports").mockReturnValue("");
    expect(() => loadMultiDayReports(1, fakeDeps, 3000)).toThrow("No reports found");
  });
});
