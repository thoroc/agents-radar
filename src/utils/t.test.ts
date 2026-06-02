import { describe, expect, it } from "vitest";
import { t } from "./t";

describe("t()", () => {
  it("returns Chinese strings for zh-CN", () => {
    expect(t("zh-CN").cliTitle).toBeTruthy();
  });

  it("returns English strings for en-US", () => {
    expect(t("en-US").cliTitle).toBeTruthy();
  });

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

  it("returns different strings for zh-CN and en-US", () => {
    expect(t("zh-CN").cliTitle).not.toBe(t("en-US").cliTitle);
  });
});
