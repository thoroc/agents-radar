import { beforeEach, describe, expect, it, vi } from "vitest";

const mockCallLlm = vi.fn<(prompt: string, maxTokens?: number) => Promise<string>>();
vi.mock("../report/call-llm", () => ({ callLlm: mockCallLlm }));

const mockSaveFile = vi.fn<(content: string, ...segments: string[]) => string>();
vi.mock("../report/save-file", () => ({ saveFile: mockSaveFile }));

const mockAutoGenFooter = vi.fn(() => "\n\n---\nfooter");
vi.mock("../report/auto-gen-footer", () => ({ autoGenFooter: mockAutoGenFooter }));

const mockCreateGitHubIssue = vi.fn(() => Promise.resolve("https://github.com/owner/repo/issues/1"));
vi.mock("../github", () => ({ createGitHubIssue: mockCreateGitHubIssue }));

vi.mock("../utils", () => ({
  t: (lang: string) =>
    lang === "en"
      ? { weeklyTitle: "Weekly Report", weeklyCoverage: "Coverage" }
      : { weeklyTitle: "周报", weeklyCoverage: "覆盖范围" },
  toCstDateStr: vi.fn(() => "2026-03-09"),
  toUtcStr: vi.fn(() => "2026-03-09 00:00:00"),
}));

const mockGetDateDirs = vi.fn();
const mockReadDailyDigest = vi.fn();
const mockGenerateRollupHighlights = vi.fn();

const mockToWeekStr = vi.fn(() => "2026-W11");
vi.mock("./week-str", () => ({ toWeekStr: mockToWeekStr }));

import { runWeeklyRollup } from "./run-weekly-rollup";

describe("runWeeklyRollup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCallLlm.mockResolvedValue("summary content");
    mockSaveFile.mockReturnValue("digests/2026-03-09/ai-weekly.md");
  });

  it("skips when no daily digests found", async () => {
    mockGetDateDirs.mockReturnValue([]);
    await runWeeklyRollup("", {});
    expect(mockCallLlm).not.toHaveBeenCalled();
  });

  it("calls LLM for zh and en when digests exist", async () => {
    mockGetDateDirs.mockReturnValue(["2026-03-09", "2026-03-08", "2026-03-07"]);
    mockReadDailyDigest.mockReturnValue("daily content");
    await runWeeklyRollup("", {});
    expect(mockCallLlm).toHaveBeenCalledTimes(2);
  });

  it("saves ai-weekly.md files", async () => {
    mockGetDateDirs.mockReturnValue(["2026-03-09", "2026-03-08"]);
    mockReadDailyDigest.mockReturnValue("daily content");
    await runWeeklyRollup("", {});
    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-03-09", "ai-weekly.md");
    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-03-09", "ai-weekly.md");
  });

  it("generates rollup highlights", async () => {
    mockGetDateDirs.mockReturnValue(["2026-03-09", "2026-03-08"]);
    mockReadDailyDigest.mockReturnValue("daily content");
    await runWeeklyRollup("", {});
    expect(mockGenerateRollupHighlights).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      "ai-weekly",
      "2026-03-09",
      6,
    );
  });

  it("creates GitHub issue when digestRepo is provided", async () => {
    mockGetDateDirs.mockReturnValue(["2026-03-09"]);
    mockReadDailyDigest.mockReturnValue("daily content");
    await runWeeklyRollup("owner/repo", {});
    expect(mockCreateGitHubIssue).toHaveBeenCalledOnce();
  });

  it("skips GitHub issue when digestRepo is empty", async () => {
    mockGetDateDirs.mockReturnValue(["2026-03-09"]);
    mockReadDailyDigest.mockReturnValue("daily content");
    await runWeeklyRollup("", {});
    expect(mockCreateGitHubIssue).not.toHaveBeenCalled();
  });
});
