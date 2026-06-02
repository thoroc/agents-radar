import { afterEach, describe, expect, it } from "vitest";
import { autoGenFooter } from "./auto-gen-footer";

describe("autoGenFooter", () => {
  const originalEnv = process.env.DIGEST_REPO;
  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.DIGEST_REPO = originalEnv;
    } else {
      delete process.env.DIGEST_REPO;
    }
  });
  it("returns empty string when DIGEST_REPO is not set", () => {
    delete process.env.DIGEST_REPO;
    expect(autoGenFooter()).toBe("");
  });
  it("returns empty string when DIGEST_REPO is empty", () => {
    process.env.DIGEST_REPO = "";
    expect(autoGenFooter()).toBe("");
  });
  it("returns Chinese footer when DIGEST_REPO is set", () => {
    process.env.DIGEST_REPO = "user/repo";
    const result = autoGenFooter("zh");
    expect(result).toContain("agents-radar");
    expect(result).toContain("github.com/user/repo");
  });
  it("returns English footer when lang is en", () => {
    process.env.DIGEST_REPO = "user/repo";
    const result = autoGenFooter("en");
    expect(result).toContain("agents-radar");
    expect(result).toContain("github.com/user/repo");
  });
});
