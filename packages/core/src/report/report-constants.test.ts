import { describe, expect, it } from "vitest";
import {
  LLM_TOKENS_DEFAULT,
  LLM_TOKENS_ROLLUP,
  LLM_TOKENS_TRENDING,
  LLM_TOKENS_WEB,
} from "./report-constants";

describe("report constants", () => {
  it("LLM_TOKENS_DEFAULT is 4096", () => {
    expect(LLM_TOKENS_DEFAULT).toBe(4096);
  });
  it("LLM_TOKENS_TRENDING is 6144", () => {
    expect(LLM_TOKENS_TRENDING).toBe(6144);
  });
  it("LLM_TOKENS_WEB is 8192", () => {
    expect(LLM_TOKENS_WEB).toBe(8192);
  });
  it("LLM_TOKENS_ROLLUP is 8192", () => {
    expect(LLM_TOKENS_ROLLUP).toBe(8192);
  });
  it("all constants are numbers", () => {
    expect(typeof LLM_TOKENS_DEFAULT).toBe("number");
    expect(typeof LLM_TOKENS_TRENDING).toBe("number");
    expect(typeof LLM_TOKENS_WEB).toBe("number");
    expect(typeof LLM_TOKENS_ROLLUP).toBe("number");
  });
});
