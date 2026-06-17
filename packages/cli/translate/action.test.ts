import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { translateAction } from "./action";

let tmpIdx = 0;
const makeTmp = () => {
  const dir = join(tmpdir(), `translate-test-${process.pid}-${tmpIdx++}`);
  mkdirSync(dir, { recursive: true });
  return dir;
};

const mockTranslateFn =
  (suffix: string) =>
  async (texts: string[], _opts: { to: string; from?: string }): Promise<[string[], unknown]> => [
    texts.map((t) => `${t} [${suffix}]`),
    {},
  ];

describe("translateAction", () => {
  it("throws when GOOGLE_TRANSLATE_API_KEY is absent", async () => {
    await expect(translateAction({ file: "README.md", verbosity: 0 }, { apiKey: "" })).rejects.toThrow(
      "GOOGLE_TRANSLATE_API_KEY is required",
    );
  });

  it("writes translated files for each non-source locale", async () => {
    const cwd = makeTmp();
    const cachePath = join(cwd, "cache.json");
    writeFileSync(join(cwd, "README.md"), "English | [中文](./README.zh-CN.md)\n\nHello world\n", "utf-8");

    await translateAction(
      { file: "README.md", verbosity: 0 },
      { cwd, apiKey: "test-key", translateFn: mockTranslateFn("translated"), cachePath },
    );

    const zhContent = readFileSync(join(cwd, "README.zh-CN.md"), "utf-8");
    expect(zhContent).toContain("[translated]");
  });

  it("preserves code blocks untranslated", async () => {
    const cwd = makeTmp();
    const cachePath = join(cwd, "cache.json");
    const content = "English | [中文](./README.zh-CN.md)\n\nIntro\n\n```bash\nnpm install\n```\n\nOutro\n";
    writeFileSync(join(cwd, "README.md"), content, "utf-8");

    await translateAction(
      { file: "README.md", verbosity: 0 },
      { cwd, apiKey: "test-key", translateFn: mockTranslateFn("X"), cachePath },
    );

    const out = readFileSync(join(cwd, "README.zh-CN.md"), "utf-8");
    expect(out).toContain("```bash\nnpm install\n```");
    expect(out).not.toContain("npm install [X]");
  });

  it("writes the translation cache after a run", async () => {
    const cwd = makeTmp();
    const cachePath = join(cwd, "cache.json");
    writeFileSync(join(cwd, "README.md"), "English | [中文](./README.zh-CN.md)\n\nHello\n", "utf-8");

    await translateAction(
      { file: "README.md", verbosity: 0 },
      { cwd, apiKey: "test-key", translateFn: mockTranslateFn("T"), cachePath },
    );

    const cache = JSON.parse(readFileSync(cachePath, "utf-8"));
    expect(Object.keys(cache).length).toBeGreaterThan(0);
  });

  it("skips the API on a second run when content is unchanged", async () => {
    const cwd = makeTmp();
    const cachePath = join(cwd, "cache.json");
    writeFileSync(join(cwd, "README.md"), "English | [中文](./README.zh-CN.md)\n\nHello\n", "utf-8");

    let callCount = 0;
    const countingFn = async (
      texts: string[],
      _opts: { to: string; from?: string },
    ): Promise<[string[], unknown]> => {
      callCount++;
      return [texts.map((t) => `${t} [T]`), {}];
    };

    const deps = { cwd, apiKey: "test-key", translateFn: countingFn, cachePath };
    await translateAction({ file: "README.md", verbosity: 0 }, deps);

    const callsAfterFirst = callCount;
    expect(callsAfterFirst).toBeGreaterThan(0);

    // second run — same content, all segments already cached
    writeFileSync(join(cwd, "README.md"), "English | [中文](./README.zh-CN.md)\n\nHello\n", "utf-8");
    await translateAction({ file: "README.md", verbosity: 0 }, deps);

    expect(callCount).toBe(callsAfterFirst);
  });
});
