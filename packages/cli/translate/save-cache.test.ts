import { mkdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { saveCache } from "./save-cache";

const makeTmp = () => {
  const dir = join(tmpdir(), `save-cache-test-${Math.floor(Date.now() / 1000)}-${process.pid}`);
  mkdirSync(dir, { recursive: true });
  return dir;
};

describe("saveCache", () => {
  it("writes the cache as pretty-printed JSON", () => {
    const dir = makeTmp();
    const path = join(dir, "cache.json");
    const data = { abc123: { "zh-CN": "你好" } };
    saveCache(path, data);
    const written = JSON.parse(readFileSync(path, "utf-8"));
    expect(written).toEqual(data);
  });

  it("creates intermediate directories if they do not exist", () => {
    const dir = makeTmp();
    const path = join(dir, "nested", "dir", "cache.json");
    saveCache(path, {});
    const written = readFileSync(path, "utf-8");
    expect(JSON.parse(written)).toEqual({});
  });

  it("overwrites an existing cache file", () => {
    const dir = makeTmp();
    const path = join(dir, "cache.json");
    saveCache(path, { old: { "zh-CN": "旧" } });
    saveCache(path, { new: { "de-DE": "Neu" } });
    expect(JSON.parse(readFileSync(path, "utf-8"))).toEqual({ new: { "de-DE": "Neu" } });
  });
});
