import { describe, expect, it } from "vitest";
import { parseJson } from "./json";

const MINIMAL_JSON = JSON.stringify({
  languages: ["en-US", "zh-CN"],
  cli_repos: [{ id: "test-tool", repo: "org/test-tool", name: "Test Tool" }],
});

describe("parseJson", () => {
  it("parses a minimal valid RawConfig from JSON", () => {
    const result = parseJson(MINIMAL_JSON);
    expect(result.languages).toEqual(["en-US", "zh-CN"]);
    expect(result.cli_repos).toHaveLength(1);
    expect(result.cli_repos![0]!.id).toBe("test-tool");
  });

  it("parses skills_repo field", () => {
    const result = parseJson(JSON.stringify({ skills_repo: "org/skills" }));
    expect(result.skills_repo).toBe("org/skills");
  });

  it("throws on invalid JSON", () => {
    expect(() => parseJson("not json {")).toThrow();
  });
});
