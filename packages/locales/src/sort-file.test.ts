import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { sortLocaleFile } from "./sort-file";

const tmpFile = (content: object) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sort-file-test-"));
  const file = path.join(dir, "en-US.json");
  fs.writeFileSync(file, JSON.stringify(content));
  return { file, dir };
};

describe("sortLocaleFile", () => {
  it("sorts keys alphabetically", () => {
    const { file, dir } = tmpFile({ zebra: "z", apple: "a", mango: "m" });
    try {
      sortLocaleFile(file);
      const result = JSON.parse(fs.readFileSync(file, "utf-8"));
      expect(Object.keys(result)).toEqual(["apple", "mango", "zebra"]);
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });

  it("pins $schema first regardless of original order", () => {
    const { file, dir } = tmpFile({ zebra: "z", $schema: "http://schema", apple: "a" });
    try {
      sortLocaleFile(file);
      const result = JSON.parse(fs.readFileSync(file, "utf-8"));
      expect(Object.keys(result)[0]).toBe("$schema");
      expect(Object.keys(result).slice(1)).toEqual(["apple", "zebra"]);
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });

  it("pins _meta second after $schema", () => {
    const { file, dir } = tmpFile({
      zebra: "z",
      _meta: { lang: "en" },
      $schema: "http://schema",
      apple: "a",
    });
    try {
      sortLocaleFile(file);
      const result = JSON.parse(fs.readFileSync(file, "utf-8"));
      expect(Object.keys(result).slice(0, 2)).toEqual(["$schema", "_meta"]);
      expect(Object.keys(result).slice(2)).toEqual(["apple", "zebra"]);
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });

  it("writes with 2-space indentation and trailing newline", () => {
    const { file, dir } = tmpFile({ b: 2, a: 1 });
    try {
      sortLocaleFile(file);
      const content = fs.readFileSync(file, "utf-8");
      expect(content.endsWith("\n")).toBe(true);
      expect(content).toContain('  "a": 1');
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });
});
