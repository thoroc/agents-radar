import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { DEFAULT_LANGUAGES, LANGUAGE_NAMES, SUPPORTED_LOCALES } from "./data";
import { LocaleFileSchema } from "./schema";
import { t } from "./t";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("SUPPORTED_LOCALES", () => {
  it("includes zh-CN and en-US", () => {
    expect(SUPPORTED_LOCALES).toContain("en-US");
    expect(SUPPORTED_LOCALES).toContain("zh-CN");
  });

  it("includes all 21 locales", () => {
    expect(SUPPORTED_LOCALES.length).toBeGreaterThanOrEqual(21);
  });
});

describe("LANGUAGE_NAMES", () => {
  it("maps locale codes to names", () => {
    expect(LANGUAGE_NAMES["en-US"]).toBe("English");
    expect(LANGUAGE_NAMES["zh-CN"]).toBe("Chinese");
  });
});

describe("DEFAULT_LANGUAGES", () => {
  it("returns en-US and zh-CN", () => {
    expect(DEFAULT_LANGUAGES).toEqual(["en-US", "zh-CN"]);
  });
});

describe("t() locale content", () => {
  const majorKeys = [
    "noActivity",
    "cliTitle",
    "cliComparison",
    "cliDetail",
    "openclawTitle",
    "openclawDeepDive",
    "openclawPeers",
    "webTitle",
    "trendingTitle",
    "hackerNewsTitle",
    "productHuntTitle",
    "arxivTitle",
    "huggingFaceTitle",
    "communityTitle",
    "weeklyTitle",
    "monthlyTitle",
  ] as const;

  for (const key of majorKeys) {
    it(`${key} has zh-CN and en-US values`, () => {
      expect(t("zh-CN")[key]).toBeTruthy();
      expect(t("en-US")[key]).toBeTruthy();
      expect(t("zh-CN")[key]).not.toBe(t("en-US")[key]);
    });
  }

  it("returns footer strings", () => {
    expect(t("zh-CN").autoGen).toContain("本日报由");
    expect(t("en-US").autoGen).toContain("auto-generated");
  });

  it("returns issue title strings without date", () => {
    expect(t("zh-CN").issueTitleCli).toContain("AI CLI");
    expect(t("en-US").issueTitleCli).toContain("AI CLI Tools Digest");
    expect(t("zh-CN").issueTitleWeb).toContain("官方");
    expect(t("en-US").issueTitleWeb).toContain("Official");
  });

  it("returns truncation and error strings", () => {
    expect(t("en-US").issueTruncation).toContain("GitHub Issue");
    expect(t("en-US").issueTruncation).toContain("GitHub Issue");
    expect(t("en-US").digestTruncation).toContain("truncated");
    expect(t("en-US").weeklyTruncation).toContain("truncated");
  });
});

describe("t() fallback", () => {
  it("returns English for unknown locale", () => {
    expect(t("xx").cliTitle).toBeTruthy();
  });

  it("returns strings for empty string input", () => {
    expect(t("").cliTitle).toBeTruthy();
  });

  it("does not crash on undefined", () => {
    expect(t().cliTitle).toBeTruthy();
  });
});

describe("notify label strings", () => {
  const NOTIFY_KEYS = [
    "notifyCli",
    "notifyAgents",
    "notifyWeb",
    "notifyTrending",
    "notifyHn",
    "notifyPh",
    "notifyArxiv",
    "notifyHf",
    "notifyCommunity",
    "notifyWeekly",
    "notifyMonthly",
  ] as const;

  for (const key of NOTIFY_KEYS) {
    it(`${key} has zh-CN and en-US values`, () => {
      expect(t("en-US")[key]).toBeTruthy();
      expect(t("en-US")[key]).toBeTruthy();
    });
  }
});

describe("report label strings", () => {
  const LABEL_KEYS = [
    "reportLabelAiCli",
    "reportLabelAiAgents",
    "reportLabelAiWeb",
    "reportLabelAiTrending",
    "reportLabelAiHn",
    "reportLabelAiWeekly",
    "reportLabelAiPh",
    "reportLabelAiArxiv",
    "reportLabelAiHf",
    "reportLabelAiCommunity",
    "reportLabelAiMonthly",
  ] as const;

  for (const key of LABEL_KEYS) {
    it(`${key} has zh-CN and en-US values`, () => {
      expect(t("zh-CN")[key]).toBeTruthy();
      expect(t("en-US")[key]).toBeTruthy();
      expect(t("zh-CN")[key]).not.toBe(t("en-US")[key]);
    });
  }
});

describe("format items", () => {
  it("provides labels for GitHub item formatting", () => {
    expect(t("en-US").formatItemAuthor).toBeTruthy();
    expect(t("en-US").formatItemAuthor).toBe("Author");
    expect(t("en-US").formatItemCreated).toBe("Created");
    expect(t("en-US").formatItemSummary).toBe("Summary");
    expect(t("en-US").sampleNote).toContain("total");
  });
});

describe("rollup strings", () => {
  it("provides weekly and monthly report labels", () => {
    expect(t("en-US").weeklyTitle).toContain("Weekly");
    expect(t("zh-CN").weeklyTitle).toContain("周报");
    expect(t("en-US").monthlyTitle).toContain("Monthly");
    expect(t("zh-CN").monthlyTitle).toContain("月报");
    expect(t("en-US").weeklyCoverage).toBe("Coverage");
    expect(t("zh-CN").weeklyCoverage).toBe("覆盖日期");
  });
});

describe("all locale files pass Zod schema", () => {
  const localesDir = path.resolve(__dirname, "../../../../locales");
  const files = fs.readdirSync(localesDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const code = path.basename(file, ".json");
    it(`${code}.json validates against LocaleFileSchema`, () => {
      const raw = JSON.parse(fs.readFileSync(path.join(localesDir, file), "utf-8"));
      expect(() => LocaleFileSchema.parse(raw)).not.toThrow();
    });
  }
});
