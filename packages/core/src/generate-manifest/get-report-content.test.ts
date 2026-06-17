import fs from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockMarkedParse = vi.fn();
vi.mock("marked", () => ({
  marked: { parse: mockMarkedParse },
}));

import { getReportContent } from "./get-report-content";

describe("getReportContent", () => {
  let readFileSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    readFileSpy = vi.spyOn(fs, "readFileSync").mockReturnValue("");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed content when file exists", async () => {
    readFileSpy.mockReturnValue("# Hello\n\nWorld");
    mockMarkedParse.mockResolvedValue("<h1>Hello</h1>\n<p>World</p>");

    const result = await getReportContent("2026-01-01", "ai-cli");

    expect(result.summary).toContain("Hello");
    expect(result.fullHtml).toContain("<h1>Hello</h1>");
    expect(fs.readFileSync).toHaveBeenCalledWith("assets/digests/2026-01-01/ai-cli.md", "utf-8");
  });

  it("truncates summary when content exceeds 500 chars", async () => {
    const longText = "a".repeat(600);
    readFileSpy.mockReturnValue(longText);
    mockMarkedParse.mockResolvedValue(longText);

    const result = await getReportContent("2026-01-01", "ai-cli");

    expect(result.summary).toHaveLength(503);
    expect(result.summary).toContain("...");
  });

  it("returns fallback when file does not exist", async () => {
    readFileSpy.mockImplementation(() => {
      throw new Error("ENOENT");
    });

    const result = await getReportContent("2026-01-01", "ai-cli");

    expect(result.summary).toContain("AI CLI");
    expect(result.summary).toContain("2026-01-01");
  });
});
