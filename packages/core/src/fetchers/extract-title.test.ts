import { describe, expect, it } from "vitest";
import { extractTitle } from "./extract-title";

describe("extractTitle", () => {
  it("extracts og:title from property attribute first", () => {
    const html = '<html><head><meta property="og:title" content="OG Title" /></head></html>';
    expect(extractTitle(html)).toBe("OG Title");
  });

  it("extracts og:title from content-first order", () => {
    const html = '<html><head><meta content="Content First" property="og:title" /></head></html>';
    expect(extractTitle(html)).toBe("Content First");
  });

  it("falls back to title tag when og:title is absent", () => {
    const html = "<html><head><title>Page Title</title></head></html>";
    expect(extractTitle(html)).toBe("Page Title");
  });

  it("returns og:title over title tag when both exist", () => {
    const html =
      '<html><head><title>Page Title</title><meta property="og:title" content="OG Title" /></head></html>';
    expect(extractTitle(html)).toBe("OG Title");
  });

  it("returns empty string when no title is found", () => {
    expect(extractTitle("<html><body></body></html>")).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(extractTitle("")).toBe("");
  });

  it("trims the result", () => {
    const html = "<html><head><title>  Spaced Title  </title></head></html>";
    expect(extractTitle(html)).toBe("Spaced Title");
  });

  it("limits title to 200 characters", () => {
    const longTitle = "x".repeat(300);
    const html = `<html><head><title>${longTitle}</title></head></html>`;
    expect(extractTitle(html).length).toBeLessThanOrEqual(200);
  });
});
