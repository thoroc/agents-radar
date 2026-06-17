import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveReport } from "./report";
import type { SaveReportConfig, SaveReportDeps } from "./saver-types";

describe("saveReport", () => {
  const mockCallLlm = vi.fn<(prompt: string, maxTokens?: number) => Promise<string>>();
  const mockSaveFile = vi.fn<(content: string, ...segments: string[]) => string>();
  const mockCreateGitHubIssue = vi.fn<(title: string, body: string, label: string) => Promise<string>>();

  const deps: SaveReportDeps = {
    callLlm: mockCallLlm,
    saveFile: mockSaveFile,
    createGitHubIssue: mockCreateGitHubIssue,
  };

  const config: SaveReportConfig = {
    data: { test: true },
    promptBuilder: (_d, ds) => `test-prompt-${ds}`,
    headerBuilder: (ds, us, _lang) => `# Test Report ${ds}\n\nGenerated: ${us} UTC`,
    fileName: "test-report",
    issueTitle: "Test Report",
    issueLabel: "test",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls callLlm with the right prompt and date suffix", async () => {
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.en-US.md");
    mockCreateGitHubIssue.mockResolvedValueOnce("https://github.com/owner/repo/issues/1");

    await saveReport(
      config,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "owner/repo",
      "\n\n---\n*footer*",
      "en-US",
      deps,
    );

    expect(mockCallLlm).toHaveBeenCalledOnce();
    expect(mockCallLlm).toHaveBeenCalledWith("test-prompt-2026-01-01", undefined);
  });

  it("calls saveFile with the correct file path", async () => {
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.en-US.md");
    mockCreateGitHubIssue.mockResolvedValueOnce("https://github.com/owner/repo/issues/1");

    await saveReport(
      config,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "owner/repo",
      "\n\n---\n*footer*",
      "en-US",
      deps,
    );

    expect(mockSaveFile).toHaveBeenCalledWith(
      expect.stringContaining("# Test Report 2026-01-01"),
      "2026-01-01",
      "test-report.md",
    );
  });

  it("includes the footer at the end of the content", async () => {
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.en-US.md");

    await saveReport(
      config,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "owner/repo",
      "\n\n---\n*footer*",
      "en-US",
      deps,
    );

    const savedContent = mockSaveFile.mock.calls[0]![0];
    expect(savedContent).toContain("*footer*");
    expect(savedContent).toContain("test content");
  });

  it("includes a --- separator between header and content", async () => {
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.en-US.md");

    await saveReport(config, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "en-US", deps);

    const savedContent = mockSaveFile.mock.calls[0]![0];
    expect(savedContent).toContain("---");
    expect(savedContent).toContain("# Test Report 2026-01-01");
    expect(savedContent).toContain("Generated:");
    expect(savedContent).toContain("test content");
  });

  it("skips saveFile and createGitHubIssue when LLM returns empty string", async () => {
    mockCallLlm.mockResolvedValueOnce("");

    await saveReport(config, "2026-01-01T00:00:00Z", "2026-01-01", "owner/repo", "", "en-US", deps);

    expect(mockSaveFile).not.toHaveBeenCalled();
    expect(mockCreateGitHubIssue).not.toHaveBeenCalled();
  });

  it("skips createGitHubIssue when digestRepo is empty", async () => {
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.md");

    await saveReport(config, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "en-US", deps);

    expect(mockSaveFile).toHaveBeenCalledOnce();
    expect(mockCreateGitHubIssue).not.toHaveBeenCalled();
  });

  it("skips createGitHubIssue when issueTitle is not set", async () => {
    const noIssueConfig: SaveReportConfig = { ...config, issueTitle: undefined };
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.md");

    await saveReport(noIssueConfig, "2026-01-01T00:00:00Z", "2026-01-01", "owner/repo", "", "en-US", deps);

    expect(mockSaveFile).toHaveBeenCalledOnce();
    expect(mockCreateGitHubIssue).not.toHaveBeenCalled();
  });

  it("calls createGitHubIssue with the correct title and label", async () => {
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.en-US.md");
    mockCreateGitHubIssue.mockResolvedValueOnce("https://github.com/owner/repo/issues/1");

    await saveReport(
      config,
      "2026-01-01T00:00:00Z",
      "2026-01-01",
      "owner/repo",
      "\n\n---\n*footer*",
      "en-US",
      deps,
    );

    expect(mockCreateGitHubIssue).toHaveBeenCalledOnce();
    expect(mockCreateGitHubIssue).toHaveBeenCalledWith("Test Report 2026-01-01", expect.any(String), "test");
  });

  it("uses Chinese file suffix when lang is zh-CN", async () => {
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.zh-CN.md");

    await saveReport(config, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "zh-CN", deps);

    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "test-report.zh-CN.md");
  });

  it("uses English file suffix when lang is en-US", async () => {
    mockCallLlm.mockResolvedValueOnce("test content");
    mockSaveFile.mockReturnValueOnce("assets/digests/2026-01-01/test-report.md");

    await saveReport(config, "2026-01-01T00:00:00Z", "2026-01-01", "", "", "en-US", deps);

    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-01-01", "test-report.md");
  });
});
