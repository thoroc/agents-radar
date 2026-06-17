import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type LocaleData, LocaleFileSchema } from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadLocales = (): {
  supportedLocales: readonly string[];
  strings: Readonly<Record<string, LocaleData>>;
  languageNames: Readonly<Record<string, string>>;
  nativeLanguageNames: Readonly<Record<string, string>>;
} => {
  const supportedLocales: string[] = [];
  const strings: Record<string, LocaleData> = {};
  const languageNames: Record<string, string> = {};
  const nativeLanguageNames: Record<string, string> = {};

  try {
    const localesDir = path.resolve(__dirname, "../../../locales");

    if (!fs.existsSync(localesDir)) {
      console.warn(`[i18n] locales directory not found: ${localesDir}`);
      return { supportedLocales, strings, languageNames, nativeLanguageNames };
    }

    const files = fs.readdirSync(localesDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const code = path.basename(file, ".json");
      const raw = JSON.parse(fs.readFileSync(path.join(localesDir, file), "utf-8"));
      const parsed = LocaleFileSchema.parse(raw);
      if (parsed._meta && parsed._meta.code !== code) {
        console.warn(
          `[i18n] ${file}: _meta.code "${parsed._meta.code}" does not match filename code "${code}"`,
        );
      }
      const { _meta, ...data } = parsed;
      strings[code] = data;
      languageNames[code] = _meta.name;
      nativeLanguageNames[code] = _meta.nativeName;
      supportedLocales.push(code);
    }
  } catch (err) {
    console.warn(`[i18n] Failed to load locales: ${err}`);
  }

  return { supportedLocales, strings, languageNames, nativeLanguageNames };
};

const locales = loadLocales();

export const SUPPORTED_LOCALES: readonly string[] = locales.supportedLocales;
export const STRINGS: Readonly<Record<string, LocaleData>> = locales.strings;
export const LANGUAGE_NAMES: Readonly<Record<string, string>> = locales.languageNames;
export const LANGUAGE_NATIVE_NAMES: Readonly<Record<string, string>> = locales.nativeLanguageNames;

const PREFERRED_DEFAULTS = ["en-US", "zh-CN"];
const resolvedDefaults = PREFERRED_DEFAULTS.filter((c) => locales.supportedLocales.includes(c));
export const DEFAULT_LANGUAGES: readonly string[] =
  resolvedDefaults.length > 0
    ? resolvedDefaults
    : locales.supportedLocales.length > 0
      ? [locales.supportedLocales[0]!]
      : [];
