import { describe, expect, it } from "vitest";
import { toRfc822 } from "./to-rfc822";

describe("toRfc822", () => {
  it("formats a known date correctly", () => {
    const date = new Date(Date.UTC(2026, 2, 9, 14, 30, 0));
    expect(toRfc822(date)).toBe("Mon, 09 Mar 2026 14:30:00 +0000");
  });

  it("pads single-digit day and hours", () => {
    const date = new Date(Date.UTC(2026, 0, 5, 3, 7, 9));
    expect(toRfc822(date)).toBe("Mon, 05 Jan 2026 03:07:09 +0000");
  });

  it("handles midnight correctly", () => {
    const date = new Date(Date.UTC(2026, 5, 15, 0, 0, 0));
    expect(toRfc822(date)).toContain("00:00:00 +0000");
  });

  it("handles end of year", () => {
    const date = new Date(Date.UTC(2026, 11, 31, 23, 59, 59));
    expect(toRfc822(date)).toContain("Dec 2026");
    expect(toRfc822(date)).toContain("23:59:59");
  });
});
