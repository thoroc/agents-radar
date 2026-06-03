import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildSourceHeader } from "./build-source-header";
import { saveDataSource } from "./data-source-report";
import * as saveReportModule from "./report";

describe("buildSourceHeader", () => {
  it("returns Chinese header for zh locale", () => {
    const result = buildSourceHeader(
      "zh-CN",
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "ArXiv Papers",
      "ArXiv",
      "https://arxiv.org/",
      "共 10 篇论文",
    );

    expect(result).toContain("# ArXiv Papers 2026-01-01");
    expect(result).toContain("数据来源");
    expect(result).toContain("共 10 篇论文");
    expect(result).toContain("arxiv.org");
    expect(result).toContain("生成时间");
  });

  it("returns English header for en locale", () => {
    const result = buildSourceHeader(
      "en-US",
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "ArXiv Papers",
      "ArXiv",
      "https://arxiv.org/",
      "10 papers",
    );

    expect(result).toContain("# ArXiv Papers 2026-01-01");
    expect(result).toContain("Sources:");
    expect(result).toContain("10 papers");
    expect(result).toContain("arxiv.org");
    expect(result).toContain("Generated");
    expect(result).not.toContain("数据来源");
  });

  it("includes extraMeta when provided", () => {
    const result = buildSourceHeader(
      "en-US",
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "Title",
      "Source",
      "https://example.com/",
      "5 items",
      "cs.AI, cs.CL",
    );

    expect(result).toContain("cs.AI, cs.CL");
    expect(result).toContain("| cs.AI, cs.CL");
  });

  it("omits extraMeta pipe when extraMeta is not provided", () => {
    const result = buildSourceHeader(
      "en-US",
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "Title",
      "Source",
      "https://example.com/",
      "5 items",
    );

    expect(result).not.toContain("| undefined");
    expect(result).not.toContain("undefined");
  });
});

describe("saveDataSource", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(saveReportModule, "saveReport").mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockCallLlm = vi.fn();
  const mockDeps = { callLlm: mockCallLlm };

  const opts = {
    hasData: true,
    logPrefix: "test",
    logAction: "Test",
    data: { items: [1, 2, 3] },
    promptBuilder: (_d: unknown, ds: string) => `prompt-${ds}`,
    headerBuilder: (ds: string, us: string, _lang: string) => `# Header ${ds} ${us}`,
    fileName: "test-file",
    issueTitle: "Test Issue",
    issueLabel: "test-label",
  };

  it("skips saveReport when hasData is false", async () => {
    await saveDataSource(
      { ...opts, hasData: false },
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "",
      "",
      "zh-CN",
      mockDeps,
    );

    expect(saveReportModule.saveReport).not.toHaveBeenCalled();
  });

  it("calls saveReport with correct config when hasData is true", async () => {
    await saveDataSource(
      opts,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "owner/repo",
      "\nfooter",
      "en-US",
      mockDeps,
    );

    expect(saveReportModule.saveReport).toHaveBeenCalledOnce();
    const args = (saveReportModule.saveReport as ReturnType<typeof vi.fn>).mock.calls[0] as [
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
    expect(lang).toBe("en-US");
    expect(callDeps).toEqual(expect.objectContaining(mockDeps));

    const headerResult = (config.headerBuilder as (ds: string, us: string, l: string) => string)(
      "2026-01-01",
      "2026-01-01T00:00:00Z",
      "en-US",
    );
    expect(headerResult).toBe("# Header 2026-01-01 2026-01-01T00:00:00Z");
  });

  it("does not throw when saveReport throws", async () => {
    vi.spyOn(saveReportModule, "saveReport").mockRejectedValueOnce(new Error("boom"));

    await expect(
      saveDataSource(opts, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh-CN", mockDeps),
    ).resolves.toBeUndefined();
  });
});
