import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./save-report", () => ({
  saveReport: vi.fn(),
  defaultDeps: {},
}));

import { buildSourceHeader } from "./build-source-header";
import { saveDataSourceReport } from "./save-data-source-report";
import { saveReport } from "./save-report";

const mockedSaveReport = saveReport as ReturnType<typeof vi.fn>;

describe("buildSourceHeader", () => {
  it("returns Chinese header when suffix is empty (zh locale)", () => {
    const result = buildSourceHeader(
      "",
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "ArXiv Papers",
      "ArXiv",
      "https://arxiv.org/",
      "10 papers",
      "共 10 篇论文",
    );

    expect(result).toContain("# ArXiv Papers 2026-01-01");
    expect(result).toContain("数据来源");
    expect(result).toContain("共 10 篇论文");
    expect(result).toContain("arxiv.org");
    expect(result).toContain("生成时间");
  });

  it("returns English header when suffix is set (en locale)", () => {
    const result = buildSourceHeader(
      ".en",
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "ArXiv Papers",
      "ArXiv",
      "https://arxiv.org/",
      "10 papers",
      "共 10 篇论文",
    );

    expect(result).toContain("# ArXiv Papers 2026-01-01");
    expect(result).toContain("Source:");
    expect(result).toContain("10 papers");
    expect(result).toContain("arxiv.org");
    expect(result).not.toContain("数据来源");
  });

  it("includes extraMeta when provided", () => {
    const result = buildSourceHeader(
      ".en",
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "Title",
      "Source",
      "https://example.com/",
      "5 items",
      "共 5 条",
      "cs.AI, cs.CL",
    );

    expect(result).toContain("cs.AI, cs.CL");
    expect(result).toContain("| cs.AI, cs.CL");
  });

  it("omits extraMeta pipe when extraMeta is not provided", () => {
    const result = buildSourceHeader(
      ".en",
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "Title",
      "Source",
      "https://example.com/",
      "5 items",
      "共 5 条",
    );

    expect(result).not.toContain("| undefined");
    expect(result).not.toContain("undefined");
  });
});

describe("saveDataSourceReport", () => {
  const mockCallLlm = vi.fn();
  const mockDeps = { callLlm: mockCallLlm };

  const opts = {
    hasData: true,
    logPrefix: "test",
    logAction: "Test",
    data: { items: [1, 2, 3] },
    promptBuilder: (_d: unknown, ds: string, _suffix: string) => `prompt-${ds}`,
    headerBuilder: (_suffix: string, ds: string, us: string) => `# Header ${ds} ${us}`,
    fileName: "test-file",
    issueTitle: "Test Issue",
    issueLabel: "test-label",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("skips saveReport when hasData is false", async () => {
    await saveDataSourceReport(
      { ...opts, hasData: false },
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "",
      "zh",
      mockDeps,
    );

    expect(mockedSaveReport).not.toHaveBeenCalled();
  });

  it("calls saveReport with correct config when hasData is true", async () => {
    await saveDataSourceReport(
      opts,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "owner/repo",
      "\nfooter",
      "en",
      mockDeps,
    );

    expect(mockedSaveReport).toHaveBeenCalledOnce();
    const args = mockedSaveReport.mock.calls[0] as [
      Record<string, unknown>,
      string,
      string,
      string,
      string,
      string,
      Record<string, unknown>,
    ];
    const [config, utcStr, dateStr, digestRepo, footer, lang, callDeps] = args;

    expect(config.data).toEqual({ items: [1, 2, 3] });
    expect(config.fileName).toBe("test-file");
    expect(config.issueTitle).toBe("Test Issue");
    expect(config.issueLabel).toBe("test-label");
    expect(typeof config.promptBuilder).toBe("function");
    expect(typeof config.headerBuilder).toBe("function");
    expect(utcStr).toBe("2026-01-01T00:00:00Z");
    expect(dateStr).toBe("2026-01-01");
    expect(digestRepo).toBe("owner/repo");
    expect(footer).toBe("\nfooter");
    expect(lang).toBe("en");
    expect(callDeps).toEqual(mockDeps);
  });

  it("does not throw when saveReport throws", async () => {
    mockedSaveReport.mockRejectedValueOnce(new Error("boom"));

    await expect(
      saveDataSourceReport(opts, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh", mockDeps),
    ).resolves.toBeUndefined();
  });
});
