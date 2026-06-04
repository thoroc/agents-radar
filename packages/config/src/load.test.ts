import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadConfig } from "./load";

const JSON_CONFIG = JSON.stringify({
  cli_repos: [{ id: "json-tool", repo: "org/json-tool", name: "JSON Tool" }],
  skills_repo: "org/json-skills",
});

const TOML_CONFIG = `
skills_repo = "org/toml-skills"

[[cli_repos]]
id = "toml-tool"
repo = "org/toml-tool"
name = "TOML Tool"
`;

describe("loadConfig", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns defaults when config file does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const config = loadConfig("/nonexistent/config.yml");
    expect(config.cliRepos.length).toBeGreaterThan(0);
    expect(config.skillsRepo).toBe("anthropics/skills");
    expect(config.openclaw.id).toBe("openclaw");
    expect(config.openclawPeers.length).toBeGreaterThan(0);
  });

  it("loads cli_repos from valid YAML", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(`
cli_repos:
  - id: custom
    repo: org/custom
    name: Custom Tool
skills_repo: custom/skills
`);
    const config = loadConfig("test.yml");
    expect(config.cliRepos).toHaveLength(1);
    expect(config.cliRepos[0]!.id).toBe("custom");
    expect(config.skillsRepo).toBe("custom/skills");
  });

  it("falls back to defaults for empty cli_repos", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("cli_repos: []");
    const config = loadConfig("test.yml");
    expect(config.cliRepos.length).toBeGreaterThan(0);
    expect(config.cliRepos[0]!.id).toBe("claude-code");
  });

  it("falls back to defaults for empty skills_repo", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("skills_repo: ''");
    const config = loadConfig("test.yml");
    expect(config.skillsRepo).toBe("anthropics/skills");
  });

  it("parses openclaw from YAML", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(`
openclaw:
  id: myclaw
  repo: org/myclaw
  name: MyClaw
  paginated: true
`);
    const config = loadConfig("test.yml");
    expect(config.openclaw).toEqual({ id: "myclaw", repo: "org/myclaw", name: "MyClaw", paginated: true });
  });

  it("falls back to default openclaw when incomplete", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("openclaw:\n  id: partial\n");
    const config = loadConfig("test.yml");
    expect(config.openclaw.id).toBe("openclaw");
  });

  it("parses openclaw_peers from YAML", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(`
openclaw_peers:
  - id: peer1
    repo: org/peer1
    name: Peer 1
    paginated: true
`);
    const config = loadConfig("test.yml");
    expect(config.openclawPeers).toHaveLength(1);
    expect(config.openclawPeers[0]!.id).toBe("peer1");
  });

  it("parses languages from YAML", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("languages:\n  - fr\n  - de\n");
    const config = loadConfig("test.yml");
    expect(config.languages).toEqual(["fr", "de"]);
  });

  it("parses schedules from YAML", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(`
schedules:
  daily:
    enabled: true
    cron: 0 8 * * *
  weekly:
    enabled: false
    cron: 0 9 * * 2
`);
    const config = loadConfig("test.yml");
    expect(config.schedules.daily.cron).toBe("0 8 * * *");
    expect(config.schedules.weekly.enabled).toBe(false);
    expect(config.schedules.monthly.enabled).toBe(true);
  });

  it("uses default schedules when not in YAML", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue("skills_repo: custom/skills\n");
    const config = loadConfig("test.yml");
    expect(config.schedules.daily.cron).toBe("0 0 * * *");
    expect(config.schedules.weekly.cron).toBe("0 1 * * 1");
    expect(config.schedules.monthly.cron).toBe("0 2 1 * *");
  });

  it("parses a JSON config file", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(JSON_CONFIG);
    const config = loadConfig("test.json");
    expect(config.cliRepos[0]!.id).toBe("json-tool");
    expect(config.skillsRepo).toBe("org/json-skills");
  });

  it("parses a TOML config file", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(TOML_CONFIG);
    const config = loadConfig("test.toml");
    expect(config.cliRepos[0]!.id).toBe("toml-tool");
    expect(config.skillsRepo).toBe("org/toml-skills");
  });

  it("auto-discovers config when no path is given", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((p) => String(p).endsWith("config.yml"));
    vi.spyOn(fs, "readFileSync").mockReturnValue("skills_repo: auto/skills\n");
    const config = loadConfig();
    expect(config.skillsRepo).toBe("auto/skills");
  });

  it("returns defaults when auto-discovery finds no file", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const config = loadConfig();
    expect(config.skillsRepo).toBe("anthropics/skills");
  });
});
