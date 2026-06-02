import { beforeEach, describe, expect, it, vi } from "vitest";

const mockReadFileSync = vi.fn();
vi.mock("node:fs", () => ({
  default: { readFileSync: mockReadFileSync },
  readFileSync: mockReadFileSync,
}));

const mockMarkedParse = vi.fn();
vi.mock("marked", () => ({
  marked: { parse: mockMarkedParse },
}));

vi.mock("./report-label", () => ({
  reportLabel: vi.fn((id: string) => `Label[${id}]`),
}));

import fs from "node:fs";
import { getReportContent } from "./get-report-content";

describe("getReportContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns parsed content when file exists", async () => {
    mockReadFileSync.mockReturnValue("# Hello\n\nWorld");
    mockMarkedParse.mockResolvedValue("<h1>Hello</h1>\n<p>World</p>");

    const result = await getReportContent("2026-01-01", "ai-cli");

    expect(result.summary).toContain("Hello");
    expect(result.fullHtml).toContain("<h1>Hello</h1>");
    expect(fs.readFileSync).toHaveBeenCalledWith("digests/2026-01-01/ai-cli.md", "utf-8");
  });

  it("truncates summary when content exceeds 500 chars", async () => {
    const longText = "a".repeat(600);
    mockReadFileSync.mockReturnValue(longText);
    mockMarkedParse.mockResolvedValue(longText);

    const result = await getReportContent("2026-01-01", "ai-cli");

    expect(result.summary).toHaveLength(503);
    expect(result.summary).toContain("...");
  });

  it("returns fallback when file does not exist", async () => {
    mockReadFileSync.mockImplementation(() => {
      throw new Error("ENOENT");
    });

    const result = await getReportContent("2026-01-01", "ai-cli");

    expect(result.summary).toContain("Label[ai-cli]");
    expect(result.summary).toContain("2026-01-01");
  });
});
