import { describe, expect, it, vi } from "vitest";
import { saveFile } from "./save-file";

describe("saveFile", () => {
  it("creates the social dir and writes the file", () => {
    const written: Record<string, string> = {};
    const deps = {
      mkdirSync: vi.fn(),
      writeFileSync: (p: string, c: string, _enc: "utf-8") => { written[p] = c; },
      readdirSync: vi.fn() as never,
      readFileSync: vi.fn() as never,
      existsSync: vi.fn() as never,
    };
    const fp = saveFile("hello", "2026-01-01-wechat.md", deps);
    expect(deps.mkdirSync).toHaveBeenCalledWith("social", { recursive: true });
    expect(fp).toContain("2026-01-01-wechat.md");
    expect(written[fp]).toBe("hello");
  });
});
