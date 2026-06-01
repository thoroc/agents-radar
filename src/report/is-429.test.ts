import { describe, expect, it } from "vitest";
import { is429 } from "./is-429";

describe("is429", () => {
  it("detects status 429 from error-like objects", () => {
    expect(is429({ status: 429 })).toBe(true);
  });
  it("detects 429 from string representation", () => {
    expect(is429(new Error("Request failed with 429"))).toBe(true);
  });
  it("returns false for other status codes", () => {
    expect(is429({ status: 500 })).toBe(false);
    expect(is429({ status: 200 })).toBe(false);
  });
  it("returns false for null/undefined", () => {
    expect(is429(null)).toBe(false);
    expect(is429(undefined)).toBe(false);
  });
  it("returns false for unrelated errors", () => {
    expect(is429(new Error("Something else"))).toBe(false);
  });
  it("detects OpenAI SDK RateLimitError shape (status + code)", () => {
    const openaiError = Object.assign(new Error("Rate limit reached"), {
      status: 429,
      code: "rate_limit_exceeded",
      type: "tokens",
    });
    expect(is429(openaiError)).toBe(true);
  });
  it("detects Anthropic SDK APIError shape (status + headers)", () => {
    const anthropicError = Object.assign(new Error("rate_limit_error"), {
      status: 429,
      headers: { "retry-after": "30" },
    });
    expect(is429(anthropicError)).toBe(true);
  });
});
