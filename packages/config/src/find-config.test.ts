import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { findConfig } from "./find-config";

describe("findConfig", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns undefined when no config file exists", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(findConfig("/some/dir")).toBeUndefined();
  });

  it("returns config.yml when it exists first", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((p) => String(p).endsWith("config.yml"));
    const result = findConfig("/project");
    expect(result).toBe(path.join("/project", "config.yml"));
  });

  it("prefers config.yml over config.yaml when both exist", () => {
    vi.spyOn(fs, "existsSync").mockImplementation(
      (p) => String(p).endsWith("config.yml") || String(p).endsWith("config.yaml"),
    );
    expect(findConfig("/project")).toBe(path.join("/project", "config.yml"));
  });

  it("returns config.yaml when only yaml extension exists", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((p) => String(p).endsWith("config.yaml"));
    expect(findConfig("/project")).toBe(path.join("/project", "config.yaml"));
  });

  it("returns config.json when only json exists", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((p) => String(p).endsWith("config.json"));
    expect(findConfig("/project")).toBe(path.join("/project", "config.json"));
  });

  it("returns config.toml when only toml exists", () => {
    vi.spyOn(fs, "existsSync").mockImplementation((p) => String(p).endsWith("config.toml"));
    expect(findConfig("/project")).toBe(path.join("/project", "config.toml"));
  });

  it("respects probe order: yml before yaml before json before toml", () => {
    const calls: string[] = [];
    vi.spyOn(fs, "existsSync").mockImplementation((p) => {
      calls.push(path.basename(String(p)));
      return String(p).endsWith("config.toml");
    });
    findConfig("/project");
    expect(calls).toEqual(["config.yml", "config.yaml", "config.json", "config.toml"]);
  });

  it("uses process.cwd() as default directory", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const result = findConfig();
    expect(result).toBeUndefined();
  });
});
