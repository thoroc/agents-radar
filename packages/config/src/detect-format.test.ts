import { describe, expect, it } from "vitest";
import { detectFormat } from "./detect-format";

describe("detectFormat", () => {
  it("detects .yml as yaml", () => {
    expect(detectFormat("config.yml")).toBe("yaml");
  });

  it("detects .yaml as yaml", () => {
    expect(detectFormat("config.yaml")).toBe("yaml");
  });

  it("detects .json as json", () => {
    expect(detectFormat("config.json")).toBe("json");
  });

  it("detects .toml as toml", () => {
    expect(detectFormat("config.toml")).toBe("toml");
  });

  it("works with absolute paths", () => {
    expect(detectFormat("/etc/app/config.yml")).toBe("yaml");
    expect(detectFormat("/etc/app/config.json")).toBe("json");
    expect(detectFormat("/etc/app/config.toml")).toBe("toml");
  });

  it("throws on unknown extension", () => {
    expect(() => detectFormat("config.ini")).toThrow(/unsupported config format/i);
  });

  it("throws on file with no extension", () => {
    expect(() => detectFormat("config")).toThrow(/unsupported config format/i);
  });
});
