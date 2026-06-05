import { describe, expect, it } from "vitest";
import { getHash } from "./get-hash";

describe("getHash", () => {
  it("returns date and report from valid hash", () => {
    window.location.hash = "#2024-01-01/ai-cli";
    expect(getHash()).toEqual({ date: "2024-01-01", report: "ai-cli" });
  });

  it("returns null for invalid date format", () => {
    window.location.hash = "#not-a-date/report";
    expect(getHash()).toBeNull();
  });

  it("returns null for missing report segment", () => {
    window.location.hash = "#2024-01-01";
    expect(getHash()).toBeNull();
  });

  it("returns null for empty hash", () => {
    window.location.hash = "";
    expect(getHash()).toBeNull();
  });
});
