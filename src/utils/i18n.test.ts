import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { LANGUAGE_NAMES, SUPPORTED_LOCALES, t, validateLocale } from ".";
import { LocaleFileSchema } from "./locale-schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("t()", () => {
  it("returns zh and en strings for all major report fields", () => {
    const keys = [
      "noActivity",
      "cliTitle",
      "cliComparison",
      "cliDetail",
      "openclawTitle",
      "openclawDeepDive",
      "openclawPeers",
      "webTitle",
      "trendingTitle",
      "hnTitle",
      "phTitle",
      "arxivTitle",
      "hfTitle",
      "communityTitle",
      "weeklyTitle",
      "monthlyTitle",
    ] as const;
    for (const key of keys) {
      expect(t("zh-CN")[key]).toBeTruthy();
      expect(t("en-US")[key]).toBeTruthy();
      expect(t("zh-CN")[key]).not.toBe(t("en-US")[key]);
    }
  });

  it("returns footer strings", () => {
    expect(t("zh-CN").autoGen).toContain("本日报由");
    expect(t("en-US").autoGen).toContain("auto-generated");
  });

  it("returns issue label keys", () => {
    expect(t("zh-CN").issueLabelCli).toBe("digest");
    expect(t("en-US").issueLabelCli).toBe("digest-en");
    expect(t("zh-CN").issueLabelOpenclaw).toBe("openclaw");
    expect(t("en-US").issueLabelTrending).toBe("trending-en");
    expect(t("en-US").issueLabelHn).toBe("hn-en");
  });

  it("returns issue title strings without date", () => {
    expect(t("zh-CN").issueTitleCli).toContain("AI CLI");
    expect(t("en-US").issueTitleCli).toContain("AI CLI Tools Digest");
    expect(t("zh-CN").issueTitleWeb).toContain("官方");
    expect(t("en-US").issueTitleWeb).toContain("Official");
  });
});

describe("t() fallback", () => {
  it("returns English for unknown locale", () => {
    const result = t("xx");
    expect(result.cliTitle).toBeTruthy();
  });

  it("returns strings for empty string input", () => {
    const result = t("");
    expect(result.cliTitle).toBeTruthy();
  });

  it("does not crash on undefined", () => {
    const result = t();
    expect(result.cliTitle).toBeTruthy();
  });
});

describe("validateLocale", () => {
  it("returns the locale if supported", () => {
    expect(validateLocale("en-US")).toBe("en-US");
    expect(validateLocale("zh-CN")).toBe("zh-CN");
  });

  it("falls back to en for unsupported locale", () => {
    expect(validateLocale("xx")).toBe("en-US");
    expect(validateLocale("")).toBe("en-US");
  });
});

describe("SUPPORTED_LOCALES", () => {
  it("includes zh and en", () => {
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

describe("all locale files pass Zod schema", () => {
  const localesDir = path.resolve(__dirname, "../../locales");
  const files = fs.readdirSync(localesDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const code = path.basename(file, ".json");
    it(`${code}.json validates against LocaleFileSchema`, () => {
      const raw = JSON.parse(fs.readFileSync(path.join(localesDir, file), "utf-8"));
      expect(() => LocaleFileSchema.parse(raw)).not.toThrow();
    });
  }
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
    it(`${key} has zh and en values`, () => {
      expect(t("zh-CN")[key]).toBeTruthy();
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
    it(`${key} has zh and en values`, () => {
      expect(t("zh-CN")[key]).toBeTruthy();
      expect(t("en-US")[key]).toBeTruthy();
      expect(t("zh-CN")[key]).not.toBe(t("en-US")[key]);
    });
  }
});

describe("format items", () => {
  it("provide labels for GitHub item formatting", () => {
    expect(t("zh-CN").formatItemAuthor).toBeTruthy();
    expect(t("en-US").formatItemAuthor).toBe("Author");
    expect(t("en-US").formatItemCreated).toBe("Created");
    expect(t("en-US").formatItemSummary).toBe("Summary");
    expect(t("en-US").sampleNote).toContain("total");
  });
});

describe("rollup strings", () => {
  it("provide weekly and monthly report labels", () => {
    expect(t("en-US").weeklyTitle).toContain("Weekly");
    expect(t("zh-CN").weeklyTitle).toContain("周报");
    expect(t("en-US").monthlyTitle).toContain("Monthly");
    expect(t("zh-CN").monthlyTitle).toContain("月报");
    expect(t("en-US").weeklyCoverage).toBe("Coverage");
    expect(t("zh-CN").weeklyCoverage).toBe("覆盖日期");
  });
});

describe("truncation and error strings", () => {
  it("provide issue truncation message", () => {
    expect(t("en-US").issueTruncation).toContain("GitHub Issue");
    expect(t("zh-CN").issueTruncation).toContain("GitHub Issue");
  });

  it("provide daily/weekly truncation markers", () => {
    expect(t("en-US").digestTruncation).toContain("truncated");
    expect(t("en-US").weeklyTruncation).toContain("truncated");
  });
});
