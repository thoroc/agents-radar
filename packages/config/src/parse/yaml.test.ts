import { describe, expect, it } from "vitest";
import { parseYaml } from "./yaml";

const MINIMAL_YAML = `
languages:
  - en-US
  - zh-CN
cli_repos:
  - id: test-tool
    repo: org/test-tool
    name: Test Tool
`;

describe("parseYaml", () => {
  it("parses a minimal valid RawConfig from YAML", () => {
    const result = parseYaml(MINIMAL_YAML);
    expect(result.languages).toEqual(["en-US", "zh-CN"]);
    expect(result.cli_repos).toHaveLength(1);
    expect(result.cli_repos![0]!.id).toBe("test-tool");
  });

  it("returns empty object for empty YAML string", () => {
    const result = parseYaml("");
    expect(result).toEqual({});
  });

  it("parses skills_repo field", () => {
    const result = parseYaml("skills_repo: org/skills\n");
    expect(result.skills_repo).toBe("org/skills");
  });
});
