import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { translateAction } from "./action";

const makeTmp = () => {
  const dir = join(tmpdir(), `translate-test-${Math.floor(Date.now() / 1000)}-${process.pid}`);
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
    writeFileSync(join(cwd, "README.md"), "Hello world\n", "utf-8");

    await translateAction(
      { file: "README.md", verbosity: 0 },
      { cwd, apiKey: "test-key", translateFn: mockTranslateFn("translated") },
    );

    const zhContent = readFileSync(join(cwd, "README.zh-CN.md"), "utf-8");
    expect(zhContent).toContain("[translated]");
  });

  it("preserves code blocks untranslated", async () => {
    const cwd = makeTmp();
    const content = "Intro\n\n```bash\nnpm install\n```\n\nOutro\n";
    writeFileSync(join(cwd, "README.md"), content, "utf-8");

    await translateAction(
      { file: "README.md", verbosity: 0 },
      { cwd, apiKey: "test-key", translateFn: mockTranslateFn("X") },
    );

    const out = readFileSync(join(cwd, "README.zh-CN.md"), "utf-8");
    expect(out).toContain("```bash\nnpm install\n```");
    expect(out).not.toContain("npm install [X]");
  });
});
