import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadCache } from "./load-cache";

let tmpIdx = 0;
const makeTmp = () => {
  const dir = join(tmpdir(), `load-cache-test-${process.pid}-${tmpIdx++}`);
  mkdirSync(dir, { recursive: true });
  return dir;
};

describe("loadCache", () => {
  it("returns empty object when file does not exist", () => {
    const path = join(makeTmp(), "nonexistent.json");
    expect(loadCache(path)).toEqual({});
  });

  it("parses a valid cache file", () => {
    const dir = makeTmp();
    const path = join(dir, "cache.json");
    const data = { abc123: { "zh-CN": "你好", "de-DE": "Hallo" } };
    writeFileSync(path, JSON.stringify(data), "utf-8");
    expect(loadCache(path)).toEqual(data);
  });

  it("returns empty object for invalid JSON", () => {
    const dir = makeTmp();
    const path = join(dir, "cache.json");
    writeFileSync(path, "not valid json", "utf-8");
    expect(loadCache(path)).toEqual({});
  });
});
