import { afterEach, describe, expect, it } from "vitest";
import { getEnabledLangs } from "./get-enabled-langs";

describe("getEnabledLangs", () => {
  const PREV_REPORT_LANGS = process.env.REPORT_LANGS;

  afterEach(() => {
    if (PREV_REPORT_LANGS === undefined) {
      delete process.env.REPORT_LANGS;
    } else {
      process.env.REPORT_LANGS = PREV_REPORT_LANGS;
    }
  });

  it("returns env var langs when REPORT_LANGS is set", () => {
    process.env.REPORT_LANGS = "fr,de";
    expect(getEnabledLangs()).toEqual(["fr", "de"]);
  });

  it("returns configured langs when no env var", () => {
    process.env.REPORT_LANGS = "";
    expect(getEnabledLangs(["ja", "ko"])).toEqual(["ja", "ko"]);
  });

  it("returns defaults when nothing configured", () => {
    process.env.REPORT_LANGS = "";
    expect(getEnabledLangs([])).toEqual(["en-US", "zh-CN"]);
  });

  it("returns defaults when langConfig undefined", () => {
    process.env.REPORT_LANGS = "";
    expect(getEnabledLangs(undefined)).toEqual(["en-US", "zh-CN"]);
  });

  it("filters empty strings from env var", () => {
    process.env.REPORT_LANGS = "en-US,,zh-CN,";
    expect(getEnabledLangs()).toEqual(["en-US", "zh-CN"]);
  });

  it("uses injectable env", () => {
    expect(getEnabledLangs(undefined, { REPORT_LANGS: "ja" })).toEqual(["ja"]);
  });
});
