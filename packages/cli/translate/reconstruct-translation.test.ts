import { describe, expect, it } from "vitest";
import { reconstructTranslation } from "./reconstruct-translation";
import type { SourceSegment } from "./segment-source";

const seg = (text: string, isCode: boolean, hash: string): SourceSegment => ({ text, isCode, hash });

describe("reconstructTranslation", () => {
  it("replaces prose segment text with the cached translation", () => {
    const segments = [seg("Hello world\n", false, "aabbccdd11223344")];
    const cache = { aabbccdd11223344: { "zh-CN": "你好世界\n" } };
    expect(reconstructTranslation(segments, cache, "zh-CN")).toBe("你好世界\n");
  });

  it("falls back to original text when the locale is not cached", () => {
    const segments = [seg("Hello\n", false, "deadbeef12345678")];
    expect(reconstructTranslation(segments, {}, "de-DE")).toBe("Hello\n");
  });

  it("preserves code block text untouched", () => {
    const segments = [seg("```bash\ncode\n```\n", true, "codehash12345678")];
    const cache = { codehash12345678: { "zh-CN": "should not appear" } };
    expect(reconstructTranslation(segments, cache, "zh-CN")).toBe("```bash\ncode\n```\n");
  });

  it("preserves blank-line passthrough segments (hash='')", () => {
    const segments = [seg("\n", false, "")];
    expect(reconstructTranslation(segments, {}, "zh-CN")).toBe("\n");
  });

  it("reconstructs a mixed document correctly", () => {
    const segments = [
      seg("Intro.\n", false, "hash0000000000001"),
      seg("\n", false, ""),
      seg("```bash\nrun\n```\n", true, "hashcode00000001"),
      seg("\n", false, ""),
      seg("Outro.\n", false, "hash0000000000002"),
    ];
    const cache = {
      hash0000000000001: { "de-DE": "Einleitung.\n" },
      hash0000000000002: { "de-DE": "Schluss.\n" },
    };
    const result = reconstructTranslation(segments, cache, "de-DE");
    expect(result).toBe("Einleitung.\n\n```bash\nrun\n```\n\nSchluss.\n");
  });
});
