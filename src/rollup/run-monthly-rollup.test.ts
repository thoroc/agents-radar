import fs from "node:fs";
import { DateTime } from "luxon";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockCallLlm = vi.fn<(prompt: string, maxTokens?: number) => Promise<string>>();
vi.mock("../report/call-llm", () => ({ callLlm: mockCallLlm }));

const mockSaveFile = vi.fn<(content: string, ...segments: string[]) => string>();
vi.mock("../report/save-file", () => ({ saveFile: mockSaveFile }));

const mockAutoGenFooter = vi.fn(() => "\n\n---\nfooter");
vi.mock("../report/auto-gen-footer", () => ({ autoGenFooter: mockAutoGenFooter }));

const mockCreateGitHubIssue = vi.fn(() => Promise.resolve("https://github.com/owner/repo/issues/1"));
vi.mock("../github", () => ({ createGitHubIssue: mockCreateGitHubIssue }));

vi.mock("../utils", () => ({
  t: () => ({ monthlyTitle: "Monthly Report" }),
  toCstDateStr: vi.fn(() => "2026-04-01"),
  toUtcStr: vi.fn(() => "2026-04-01 00:00:00"),
}));

const mockGetDateDirs = vi.fn();
const mockReadDailyDigest = vi.fn();
const mockReadWeeklyDigest = vi.fn();
const mockGenerateRollupHighlights = vi.fn();

import { runMonthlyRollup } from "./run-monthly-rollup";

const computeMonthStr = (): string => {
  const now = DateTime.now();
  const cstDate = now.plus({ hours: 8 });
  const prevMonth = DateTime.utc(cstDate.year, cstDate.month - 1, 1);
  return prevMonth.toFormat("yyyy-MM");
};

describe("runMonthlyRollup", () => {
  let monthStr: string;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCallLlm.mockResolvedValue("monthly summary content");
    mockSaveFile.mockReturnValue("digests/2026-04-01/ai-monthly.md");
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    monthStr = computeMonthStr();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips when no date dirs found", async () => {
    mockGetDateDirs.mockReturnValue([]);
    await runMonthlyRollup("", {});
    expect(mockCallLlm).not.toHaveBeenCalled();
  });

  it("uses weekly digests when 2+ weekly reports exist", async () => {
    mockGetDateDirs.mockReturnValue([`${monthStr}-01`, `${monthStr}-08`, `${monthStr}-15`]);
    mockReadWeeklyDigest.mockReturnValue("weekly content");
    await runMonthlyRollup("", {});
    expect(mockReadWeeklyDigest).toHaveBeenCalled();
    expect(mockReadDailyDigest).not.toHaveBeenCalled();
    expect(mockCallLlm).toHaveBeenCalledTimes(2);
  });

  it("falls back to sampled daily digests when fewer than 2 weekly reports", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);

    mockGetDateDirs.mockReturnValue([
      `${monthStr}-01`,
      `${monthStr}-02`,
      `${monthStr}-03`,
      `${monthStr}-04`,
      `${monthStr}-05`,
      `${monthStr}-06`,
      `${monthStr}-07`,
    ]);
    mockReadDailyDigest.mockReturnValue("daily content");
    await runMonthlyRollup("", {});
    expect(mockReadDailyDigest).toHaveBeenCalled();
    expect(mockReadWeeklyDigest).not.toHaveBeenCalled();
    expect(mockCallLlm).toHaveBeenCalledTimes(2);
  });

  it("saves ai-monthly.md files", async () => {
    mockGetDateDirs.mockReturnValue([`${monthStr}-01`, `${monthStr}-08`]);
    mockReadWeeklyDigest.mockReturnValue("weekly content");
    await runMonthlyRollup("", {});
    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-04-01", "ai-monthly.md");
    expect(mockSaveFile).toHaveBeenCalledWith(expect.any(String), "2026-04-01", "ai-monthly.md");
  });

  it("generates rollup highlights", async () => {
    mockGetDateDirs.mockReturnValue([`${monthStr}-01`, `${monthStr}-08`]);
    mockReadWeeklyDigest.mockReturnValue("weekly content");
    await runMonthlyRollup("", {});
    expect(mockGenerateRollupHighlights).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      "ai-monthly",
      "2026-04-01",
      6,
    );
  });

  it("creates GitHub issue when digestRepo is provided", async () => {
    mockGetDateDirs.mockReturnValue([`${monthStr}-01`]);
    mockReadWeeklyDigest.mockReturnValue("weekly content");
    await runMonthlyRollup("owner/repo", {});
    expect(mockCreateGitHubIssue).toHaveBeenCalledOnce();
  });

  it("skips GitHub issue when digestRepo is empty", async () => {
    mockGetDateDirs.mockReturnValue([`${monthStr}-01`]);
    mockReadWeeklyDigest.mockReturnValue("weekly content");
    await runMonthlyRollup("", {});
    expect(mockCreateGitHubIssue).not.toHaveBeenCalled();
  });
});
