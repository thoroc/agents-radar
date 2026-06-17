import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { sort } from "./sort";

const tmpDir = () => fs.mkdtempSync(path.join(os.tmpdir(), "sort-test-"));

const write = (dir: string, file: string, content: object) => {
  const p = path.resolve(dir, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(content));
};

describe("sort", () => {
  it("sorts all locale files in the locales directory", () => {
    const dir = tmpDir();
    try {
      write(dir, "locales/en-US.json", { zebra: "z", apple: "a" });
      write(dir, "locales/zh-CN.json", { mango: "m", banana: "b" });

      sort(dir);

      const en = JSON.parse(fs.readFileSync(path.resolve(dir, "locales/en-US.json"), "utf-8"));
      expect(Object.keys(en)).toEqual(["apple", "zebra"]);

      const zh = JSON.parse(fs.readFileSync(path.resolve(dir, "locales/zh-CN.json"), "utf-8"));
      expect(Object.keys(zh)).toEqual(["banana", "mango"]);
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });
});
