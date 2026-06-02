import fs from "node:fs";
import { DateTime } from "luxon";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as githubModule from "../github";
import * as autoGenFooterModule from "../report/auto-gen-footer";
import * as callLlmModule from "../report/call-llm";
import * as saveFileModule from "../report/save-file";
import * as utilsModule from "../utils";
import * as getEnabledLangsModule from "../utils/get-enabled-langs";
import * as loadConfigModule from "../utils/load-config";
import * as generateRollupHighlightsModule from "./generate-rollup-highlights";
import * as getDateDirsModule from "./get-date-dirs";
import * as readDailyDigestModule from "./read-daily-digest";
import * as readWeeklyDigestModule from "./read-weekly-digest";

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
    vi.spyOn(callLlmModule, "callLlm").mockResolvedValue("monthly summary content");
    vi.spyOn(saveFileModule, "saveFile").mockReturnValue("digests/2026-04-01/ai-monthly.md");
    vi.spyOn(autoGenFooterModule, "autoGenFooter").mockReturnValue("\n\n---\nfooter");
    vi.spyOn(githubModule, "createGitHubIssue").mockResolvedValue("https://github.com/owner/repo/issues/1");
    vi.spyOn(utilsModule, "t").mockReturnValue({
      monthlyTitle: "Monthly Report",
      monthlyMeta: "> Sources: {sources} | Generated: {utcStr} UTC\n\n",
      sourceLabelWeekly: "{n} weekly reports",
      sourceLabelDailySampled: "{n} daily reports (sampled every 4 days)",
    } as never);
    vi.spyOn(utilsModule, "toCstDateStr").mockReturnValue("2026-04-01");
    vi.spyOn(utilsModule, "toUtcStr").mockReturnValue("2026-04-01 00:00:00");
    vi.spyOn(loadConfigModule, "loadConfig").mockReturnValue({
      languages: ["en-US", "zh-CN"],
      defaultPrimaryLanguage: "en-US",
      defaultFallbackLanguage: "en-US",
    } as never);
    vi.spyOn(getEnabledLangsModule, "getEnabledLangs").mockReturnValue(["zh-CN", "en-US"]);
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([]);
    vi.spyOn(readDailyDigestModule, "readDailyDigest").mockResolvedValue("daily content");
    vi.spyOn(readWeeklyDigestModule, "readWeeklyDigest").mockReturnValue("weekly content" as never);
    vi.spyOn(generateRollupHighlightsModule, "generateRollupHighlights").mockResolvedValue({} as never);
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    monthStr = computeMonthStr();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("skips when no date dirs found", async () => {
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([]);
    await runMonthlyRollup("", {});
    expect(callLlmModule.callLlm).not.toHaveBeenCalled();
  });

  it("uses weekly digests when 2+ weekly reports exist", async () => {
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([
      `${monthStr}-01`,
      `${monthStr}-08`,
      `${monthStr}-15`,
    ]);
    await runMonthlyRollup("", {});
    expect(readWeeklyDigestModule.readWeeklyDigest).toHaveBeenCalled();
    expect(callLlmModule.callLlm).toHaveBeenCalledTimes(2);
  });

  it("falls back to sampled daily digests when fewer than 2 weekly reports", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);

    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([
      `${monthStr}-01`,
      `${monthStr}-02`,
      `${monthStr}-03`,
      `${monthStr}-04`,
      `${monthStr}-05`,
      `${monthStr}-06`,
      `${monthStr}-07`,
    ]);
    await runMonthlyRollup("", {});
    expect(readDailyDigestModule.readDailyDigest).toHaveBeenCalled();
    expect(readWeeklyDigestModule.readWeeklyDigest).not.toHaveBeenCalled();
    expect(callLlmModule.callLlm).toHaveBeenCalledTimes(2);
  });

  it("saves ai-monthly.md files", async () => {
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([`${monthStr}-01`, `${monthStr}-08`]);
    await runMonthlyRollup("", {});
    expect(saveFileModule.saveFile).toHaveBeenCalledWith(expect.any(String), "2026-04-01", "ai-monthly.md");
  });

  it("generates rollup highlights", async () => {
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([`${monthStr}-01`, `${monthStr}-08`]);
    await runMonthlyRollup("", {});
    expect(generateRollupHighlightsModule.generateRollupHighlights).toHaveBeenCalledWith(
      expect.any(Object),
      "ai-monthly",
      "2026-04-01",
      6,
    );
  });

  it("creates GitHub issue when digestRepo is provided", async () => {
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([`${monthStr}-01`]);
    await runMonthlyRollup("owner/repo", {});
    expect(githubModule.createGitHubIssue).toHaveBeenCalledOnce();
  });

  it("skips GitHub issue when digestRepo is empty", async () => {
    vi.spyOn(getDateDirsModule, "getDateDirs").mockReturnValue([`${monthStr}-01`]);
    await runMonthlyRollup("", {});
    expect(githubModule.createGitHubIssue).not.toHaveBeenCalled();
  });
});
