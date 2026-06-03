import { describe, expect, it } from "vitest";
import { requireEnv } from "./require-env";

describe("requireEnv", () => {
  it("returns the env var value when set", () => {
    expect(requireEnv("MY_VAR", { MY_VAR: "hello" })).toBe("hello");
  });

  it("throws when env var is not set", () => {
    expect(() => requireEnv("MISSING", {})).toThrow("Missing required environment variable: MISSING");
  });

  it("throws when env var is empty string", () => {
    expect(() => requireEnv("EMPTY", { EMPTY: "" })).toThrow("Missing required environment variable: EMPTY");
  });
});
