import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getPrimaryLang, SUPPORTED_LOCALES, toGoogleLang } from "@agents-radar/locales";
import type { TranslationCache } from "./cache-types";
import { loadCache } from "./load-cache";
import { reconstructTranslation } from "./reconstruct-translation";
import { saveCache } from "./save-cache";
import { segmentSource } from "./segment-source";
import { updateReadmeLinks } from "./update-readme-links";

const CACHE_FILE = "assets/translation-cache.json";

type TranslateFn = (texts: string[], options: { to: string; from?: string }) => Promise<[string[], unknown]>;

export interface TranslateActionArgs {
  file: string;
  verbosity: number;
}

export type TranslateDeps = {
  translateFn?: TranslateFn;
  apiKey?: string;
  cwd?: string;
  cachePath?: string;
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

  const cachePath = deps.cachePath ?? join(cwd, CACHE_FILE);
  const cache: TranslationCache = loadCache(cachePath);
  const segments = segmentSource(content);
  const translatableSegments = segments.filter((s) => !s.isCode && s.text.trim() && s.hash);

  if (verbosity >= 1) {
    console.error(`Translating ${file} — ${translatableSegments.length} segments, ${locales.length} locales`);
  }

  for (const locale of locales) {
    const googleLang = toGoogleLang(locale);
    const missing = translatableSegments.filter((s) => !cache[s.hash]?.[locale]);

    if (missing.length === 0) {
      if (verbosity >= 1) console.error(`  ${locale} — fully cached, skipping`);
    } else {
      if (verbosity >= 1) {
        console.error(`  ${locale} — translating ${missing.length}/${translatableSegments.length} segments`);
      }
      const [translations] = await translateFn(
        missing.map((s) => s.text),
        { to: googleLang, from: "en" },
      );
      for (const [i, segment] of missing.entries()) {
        const entry = cache[segment.hash] ?? {};
        cache[segment.hash] = entry;
        entry[locale] = translations[i] ?? segment.text;
      }
    }

    const translated = reconstructTranslation(segments, cache, locale);
    writeFileSync(join(cwd, `${baseName}.${locale}.md`), translated, "utf-8");
  }

  saveCache(cachePath, cache);

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
