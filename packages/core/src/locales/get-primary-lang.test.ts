import { afterEach, describe, expect, it, vi } from "vitest";
import * as loadModule from "../config/load";
import { getPrimaryLang } from "./get-primary-lang";

describe("getPrimaryLang", () => {
  afterEach(() => vi.restoreAllMocks());

  it("loads primaryLang from config when not cached", () => {
    vi.spyOn(loadModule, "loadConfig").mockReturnValue({
      defaultPrimaryLanguage: "zh-CN",
      defaultFallbackLanguage: "en-US",
    } as never);
    const args = { primaryLang: null, fallbackLang: null };
    expect(getPrimaryLang(args)).toBe("zh-CN");
    expect(args.fallbackLang).toBe("en-US");
  });

  it("returns cached value without calling loadConfig again", () => {
    const spy = vi.spyOn(loadModule, "loadConfig");
    const args = { primaryLang: "en-US", fallbackLang: null };
    expect(getPrimaryLang(args)).toBe("en-US");
    expect(spy).not.toHaveBeenCalled();
  });

  it("only calls loadConfig once for the same args object", () => {
    const spy = vi.spyOn(loadModule, "loadConfig").mockReturnValue({
      defaultPrimaryLanguage: "zh-CN",
      defaultFallbackLanguage: "en-US",
    } as never);
    const args = { primaryLang: null, fallbackLang: null };
    getPrimaryLang(args);
    getPrimaryLang(args);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
