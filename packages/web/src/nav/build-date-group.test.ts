import { describe, expect, it, vi } from "vitest";
import { buildDateGroup } from "./build-date-group";

describe("buildDateGroup", () => {
  it("returns element with date-group class", () => {
    const el = buildDateGroup("2024-01-15", ["ai-cli"], false, {}, vi.fn());
    expect(el.classList.contains("date-group")).toBe(true);
  });

  it("adds open class when isFirst is true", () => {
    const el = buildDateGroup("2024-01-15", ["ai-cli"], true, {}, vi.fn());
    expect(el.classList.contains("open")).toBe(true);
  });

  it("does not add open class when isFirst is false", () => {
    const el = buildDateGroup("2024-01-15", ["ai-cli"], false, {}, vi.fn());
    expect(el.classList.contains("open")).toBe(false);
  });

  it("sets data-date attribute", () => {
    const el = buildDateGroup("2024-01-15", ["ai-cli"], false, {}, vi.fn());
    expect(el.dataset.date).toBe("2024-01-15");
  });

  it("shows day part (DD) in header", () => {
    const el = buildDateGroup("2024-01-15", ["ai-cli"], false, {}, vi.fn());
    expect(el.querySelector(".date-hdr")?.textContent).toContain("15");
  });

  it("creates lang buttons for report with EN variant", () => {
    const el = buildDateGroup("2024-01-15", ["ai-cli", "ai-cli-en"], false, {}, vi.fn());
    expect(el.querySelectorAll(".lang-btn").length).toBe(2);
  });

  it("creates single report button for non-EN report", () => {
    const el = buildDateGroup("2024-01-15", ["ai-cli"], false, {}, vi.fn());
    expect(el.querySelectorAll(".rpt-btn").length).toBe(1);
  });

  it("uses manifest label when provided", () => {
    const el = buildDateGroup("2024-01-15", ["ai-cli"], false, { "ai-cli": "AI Tools" }, vi.fn());
    expect(el.querySelector(".rpt-btn")?.textContent).toBe("AI Tools");
  });

  it("calls onLoad with date and report when report button clicked", () => {
    const onLoad = vi.fn();
    const el = buildDateGroup("2024-01-15", ["ai-cli"], false, {}, onLoad);
    (el.querySelector(".rpt-btn") as HTMLButtonElement).click();
    expect(onLoad).toHaveBeenCalledWith("2024-01-15", "ai-cli");
  });
});
