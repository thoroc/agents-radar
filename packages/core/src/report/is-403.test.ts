import { describe, expect, it } from "vitest";
import { is403 } from "./is-403";

describe("is403", () => {
  it("detects status 403 from error-like objects", () => {
    expect(is403({ status: 403 })).toBe(true);
  });
  it("detects 403 from permission_error string", () => {
    expect(is403(new Error("permission_error: insufficient quota"))).toBe(true);
  });
  it("returns false for other status codes", () => {
    expect(is403({ status: 429 })).toBe(false);
    expect(is403({ status: 500 })).toBe(false);
  });
  it("returns false for null/undefined", () => {
    expect(is403(null)).toBe(false);
    expect(is403(undefined)).toBe(false);
  });
  it("returns false for unrelated errors", () => {
    expect(is403(new Error("Something else"))).toBe(false);
  });
  it("detects Anthropic SDK permission_error shape", () => {
    const anthropicError = Object.assign(new Error("permission_error"), {
      status: 403,
      error: { type: "permission_error" },
    });
    expect(is403(anthropicError)).toBe(true);
  });
});
