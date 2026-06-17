import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getPrimaryLang, SUPPORTED_LOCALES, toGoogleLang } from "@agents-radar/locales";
import { segmentContent } from "./segment-content";
import { updateReadmeLinks } from "./update-readme-links";

type TranslateFn = (texts: string[], options: { to: string; from?: string }) => Promise<[string[], unknown]>;

export interface TranslateActionArgs {
  file: string;
  verbosity: number;
}

export type TranslateDeps = {
  translateFn?: TranslateFn;
  apiKey?: string;
  cwd?: string;
};

export const translateAction = async (args: TranslateActionArgs, deps: TranslateDeps = {}): Promise<void> => {
  const { file, verbosity } = args;
  const { cwd = process.cwd() } = deps;

  const apiKey = deps.apiKey ?? process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_TRANSLATE_API_KEY is required");
  }

  let translateFn = deps.translateFn;
  if (!translateFn) {
    const { v2 } = await import("@google-cloud/translate");
    const client = new v2.Translate({ key: apiKey });
    translateFn = (texts, opts) => client.translate(texts, opts) as Promise<[string[], unknown]>;
  }

  const filePath = join(cwd, file);
  const content = readFileSync(filePath, "utf-8");
  const baseName = file.replace(/\.md$/, "");
  const locales = SUPPORTED_LOCALES.filter((l) => l !== getPrimaryLang());

  if (verbosity >= 1) {
    console.error(`Translating ${file} into ${locales.length} languages`);
  }

  for (const locale of locales) {
    const googleLang = toGoogleLang(locale);
    const segments = segmentContent(content);

    const proseSegments = segments.filter((s) => !s.isCode && s.text.trim());
    const proseTexts = proseSegments.map((s) => s.text);

    const [translations] = await translateFn(proseTexts, { to: googleLang, from: "en" });

    let idx = 0;
    const translated = segments
      .map((s) => {
        if (s.isCode || !s.text.trim()) return s.text;
        return translations[idx++] ?? s.text;
      })
      .join("");

    const outPath = join(cwd, `${baseName}.${locale}.md`);
    writeFileSync(outPath, translated, "utf-8");

    if (verbosity >= 1) {
      console.error(`  ${locale} done`);
    }
  }

  const updatedContent = updateReadmeLinks({
    content,
    locales: SUPPORTED_LOCALES,
    primaryLang: getPrimaryLang(),
  });
  writeFileSync(filePath, updatedContent, "utf-8");

  if (verbosity >= 1) {
    console.error(`Updated language links in ${file}`);
  }
};
