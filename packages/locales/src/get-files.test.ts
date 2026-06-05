import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getLocaleFiles } from "./get-files";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");

describe("getLocaleFiles", () => {
  it("returns a sorted list of JSON locale files", () => {
    const files = getLocaleFiles(repoRoot);
    expect(files.length).toBeGreaterThanOrEqual(21);
    expect(files).toContain("en-US.json");
    expect(files).toContain("zh-CN.json");
    expect(files).toEqual([...files].sort());
  });
});
