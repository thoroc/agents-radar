import { describe, expect, it, vi } from "vitest";
import type { ManifestEntry } from "../types";
import { buildMonthGroup } from "./build-month-group";

describe("buildMonthGroup", () => {
  const entries: ManifestEntry[] = [
    { date: "2024-01-01", reports: ["ai-cli"] },
    { date: "2024-01-02", reports: ["ai-cli"] },
  ];

  it("returns element with month-group class", () => {
    const ref = { value: true };
    const el = buildMonthGroup("2024-01", entries, false, ref, {}, vi.fn());
    expect(el.classList.contains("month-group")).toBe(true);
  });

  it("adds open class when isFirstMonth", () => {
    const ref = { value: true };
    const el = buildMonthGroup("2024-01", entries, true, ref, {}, vi.fn());
    expect(el.classList.contains("open")).toBe(true);
  });

  it("does not add open class when not first month", () => {
    const ref = { value: false };
    const el = buildMonthGroup("2024-01", entries, false, ref, {}, vi.fn());
    expect(el.classList.contains("open")).toBe(false);
  });

  it("shows month label in header", () => {
    const ref = { value: true };
    const el = buildMonthGroup("2024-01", entries, false, ref, {}, vi.fn());
    expect(el.querySelector(".month-hdr")?.textContent).toContain("2024-01");
  });

  it("creates date groups inside month-body", () => {
    const ref = { value: true };
    const el = buildMonthGroup("2024-01", entries, false, ref, {}, vi.fn());
    const dateGroups = el.querySelectorAll(".date-group");
    expect(dateGroups.length).toBe(entries.length);
  });

  it("sets isFirstDateRef.value to false after first entry", () => {
    const ref = { value: true };
    buildMonthGroup("2024-01", entries, false, ref, {}, vi.fn());
    expect(ref.value).toBe(false);
  });
});
