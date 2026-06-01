import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type LocaleData, LocaleFileSchema } from "./locale-schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadLocales = (): {
  supportedLocales: readonly string[];
  strings: Readonly<Record<string, LocaleData>>;
  languageNames: Readonly<Record<string, string>>;
} => {
  const supportedLocales: string[] = [];
  const strings: Record<string, LocaleData> = {};
  const languageNames: Record<string, string> = {};

  try {
    const localesDir = path.resolve(__dirname, "../../locales");

    if (!fs.existsSync(localesDir)) {
      console.warn(`[i18n] locales directory not found: ${localesDir}`);
      return { supportedLocales, strings, languageNames };
    }

    const files = fs.readdirSync(localesDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const code = path.basename(file, ".json");
      const raw = JSON.parse(fs.readFileSync(path.join(localesDir, file), "utf-8"));
      const parsed = LocaleFileSchema.parse(raw);
      const { _meta, ...data } = parsed;
      strings[code] = data;
      languageNames[code] = _meta.name;
      supportedLocales.push(code);
    }
  } catch (err) {
    console.warn(`[i18n] Failed to load locales: ${err}`);
  }

  return { supportedLocales, strings, languageNames };
};

const locales = loadLocales();

export const SUPPORTED_LOCALES: readonly string[] = locales.supportedLocales;
export const STRINGS: Readonly<Record<string, LocaleData>> = locales.strings;
export const LANGUAGE_NAMES: Readonly<Record<string, string>> = locales.languageNames;

export const DEFAULT_LANGUAGES: string[] = ["en", "zh"];
