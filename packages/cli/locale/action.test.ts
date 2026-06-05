import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { localeAction } from "./action";

const write = (dir: string, file: string, content: string) => {
  const p = path.resolve(dir, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
};

const tmpDir = () => fs.mkdtempSync(path.join(os.tmpdir(), "locale-test-"));

describe("localeAction generate", () => {
  it("generates locale-schema.json and locale.ts", async () => {
    const dir = tmpDir();
    try {
      write(dir, "locales/en-US.json", JSON.stringify({ cliTitle: "AI CLI Tools" }));
      write(dir, "locales/zh-CN.json", JSON.stringify({ cliTitle: "AI CLI 工具" }));
      fs.mkdirSync(path.resolve(dir, "packages/locales/src/types"), { recursive: true });

      await localeAction({ generate: true }, { repoRoot: dir });

      expect(fs.existsSync(path.resolve(dir, "locale-schema.json"))).toBe(true);
      const schema = JSON.parse(fs.readFileSync(path.resolve(dir, "locale-schema.json"), "utf-8"));
      expect(schema.$schema).toBe("https://json-schema.org/draft/2020-12/schema");

      const typePath = path.resolve(dir, "packages/locales/src/types/locale.ts");
      expect(fs.existsSync(typePath)).toBe(true);
      const typeContent = fs.readFileSync(typePath, "utf-8");
      expect(typeContent).toContain('"en-US"');
      expect(typeContent).toContain('"zh-CN"');
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });
});

describe("localeAction validate", () => {
  it("passes for valid locale files", async () => {
    const dir = tmpDir();
    try {
      write(
        dir,
        "locale-schema.json",
        JSON.stringify({
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          properties: { cliTitle: { type: "string" } },
          required: ["cliTitle"],
        }),
      );
      write(dir, "locales/en-US.json", JSON.stringify({ cliTitle: "AI CLI Tools" }));

      await localeAction({ validate: true }, { repoRoot: dir });
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });

  it("fails for invalid locale files", async () => {
    const dir = tmpDir();
    try {
      write(
        dir,
        "locale-schema.json",
        JSON.stringify({
          $schema: "https://json-schema.org/draft/2020-12/schema",
          type: "object",
          properties: { cliTitle: { type: "string" } },
          required: ["cliTitle"],
        }),
      );
      write(dir, "locales/en-US.json", JSON.stringify({ cliTitle: 123 }));

      await expect(localeAction({ validate: true }, { repoRoot: dir })).rejects.toThrow(
        "Locale validation failed",
      );
    } finally {
      fs.rmSync(dir, { recursive: true });
    }
  });
});
