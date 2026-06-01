import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { sleep, toCstDateStr, toUtcStr } from ".";

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

describe("sleep", () => {
  it("resolves after approximately the given ms", async () => {
    const start = Date.now();
    await sleep(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(40);
    expect(elapsed).toBeLessThan(200);
  });
});
