import { describe, expect, it } from "vitest";
import { t } from "./t";

describe("t()", () => {
  it("returns en-US strings by default", () => {
    expect(t().cliTitle).toBeTruthy();
  });

  it("returns strings for a valid locale", () => {
    expect(t("zh-CN").cliTitle).toBeTruthy();
  });

  it("falls back to en-US for unknown locale", () => {
    expect(t("xx-XX").cliTitle).toBe(t("en-US").cliTitle);
  });
});
