import { describe, expect, it } from "vitest";
import { parseToml } from "./toml";

const MINIMAL_TOML = `
languages = ["en-US", "zh-CN"]

[[cli_repos]]
id = "test-tool"
repo = "org/test-tool"
name = "Test Tool"
`;

describe("parseToml", () => {
  it("parses a minimal valid RawConfig from TOML", () => {
    const result = parseToml(MINIMAL_TOML);
    expect(result.languages).toEqual(["en-US", "zh-CN"]);
    expect(result.cli_repos).toHaveLength(1);
    expect(result.cli_repos![0]!.id).toBe("test-tool");
  });

  it("parses skills_repo field", () => {
    const result = parseToml('skills_repo = "org/skills"\n');
    expect(result.skills_repo).toBe("org/skills");
  });

  it("throws on invalid TOML", () => {
    expect(() => parseToml("key = [unclosed")).toThrow();
  });
});
