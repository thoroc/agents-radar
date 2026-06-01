import { describe, expect, it } from "vitest";
import en from "../../locales/en.json" with { type: "json" };
import { LocaleDataSchema, LocaleFileSchema } from "./locale-schema";

describe("LocaleDataSchema", () => {
  it("validates the real en.json data", () => {
    const result = LocaleDataSchema.safeParse(en);
    expect(result.success).toBe(true);
  });

  it("validates with _meta (LocaleFileSchema)", () => {
    const result = LocaleFileSchema.safeParse(en);
    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const result = LocaleDataSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("infers the correct type", () => {
    const meta = LocaleFileSchema.parse(en);
    expect(meta._meta.name).toBe("English");
  });
});
