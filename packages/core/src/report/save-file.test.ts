import fs from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveFile } from "./save-file";

describe("saveFile", () => {
  beforeEach(() => {
    vi.spyOn(fs, "mkdirSync").mockReturnValue(undefined);
    vi.spyOn(fs, "writeFileSync").mockReturnValue(undefined);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("returns the expected file path", () => {
    const result = saveFile("content", "2026-03-09", "ai-cli.md");
    expect(result).toBe("digests/2026-03-09/ai-cli.md");
  });
  it("creates parent directories recursively", () => {
    saveFile("content", "2026-03-09", "ai-cli.md");
    expect(fs.mkdirSync).toHaveBeenCalledWith("digests/2026-03-09", { recursive: true });
  });
  it("writes content as utf-8", () => {
    saveFile("hello world", "2026-03-09", "test.md");
    expect(fs.writeFileSync).toHaveBeenCalledWith("digests/2026-03-09/test.md", "hello world", "utf-8");
  });
});
