import { describe, expect, it } from "vitest";
import { t } from "./t";

describe("t()", () => {
  it("returns Chinese strings for zh", () => {
    expect(t("zh").cliTitle).toBeTruthy();
  });

  it("returns English strings for en", () => {
    expect(t("en").cliTitle).toBeTruthy();
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

  it("returns different strings for zh and en", () => {
    expect(t("zh").cliTitle).not.toBe(t("en").cliTitle);
  });
});
