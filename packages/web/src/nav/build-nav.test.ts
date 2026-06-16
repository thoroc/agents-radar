import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ManifestEntry } from "../types";
import { buildNav } from "./build-nav";

describe("buildNav", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="nav"></div>';
  });

  const dates: ManifestEntry[] = [
    { date: "2024-01-01", reports: ["ai-cli"] },
    { date: "2024-01-02", reports: ["ai-cli"] },
    { date: "2024-02-01", reports: ["ai-cli"] },
  ];

  it("populates the #nav element", () => {
    buildNav(dates, {}, vi.fn());
    expect(document.getElementById("nav")?.children.length).toBeGreaterThan(0);
  });

  it("groups dates into month groups", () => {
    buildNav(dates, {}, vi.fn());
    expect(document.querySelectorAll(".month-group").length).toBe(2);
  });

  it("opens the first month group", () => {
    buildNav(dates, {}, vi.fn());
    const first = document.querySelector(".month-group");
    expect(first?.classList.contains("open")).toBe(true);
  });

  it("does nothing when #nav element is absent", () => {
    document.body.innerHTML = "";
    expect(() => buildNav(dates, {}, vi.fn())).not.toThrow();
  });
});
