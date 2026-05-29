import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LocaleFileSchema, type LocaleData } from "./locale-schema";

let _initialized = false;

export const SUPPORTED_LOCALES: string[] = [];
export const STRINGS: Record<string, LocaleData> = {};
export const LANGUAGE_NAMES: Record<string, string> = {};

export type Lang = string;

/** The default/primary language — used as the no-suffix filename convention. */
export const DEFAULT_PRIMARY_LANGUAGE = "zh-CN";

/** The fallback language when a locale is not found. */
export const DEFAULT_FALLBACK_LANGUAGE = "en-US";

function ensureLocales(): void {
  if (_initialized) return;
  _initialized = true;

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const localesDir = path.resolve(__dirname, "../locales");

    if (!fs.existsSync(localesDir)) {
      console.warn(`[i18n] locales directory not found: ${localesDir}`);
      return;
    }

    const files = fs.readdirSync(localesDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const code = path.basename(file, ".json");
      const raw = JSON.parse(fs.readFileSync(path.join(localesDir, file), "utf-8"));
      const parsed = LocaleFileSchema.parse(raw);
      const { _meta, ...data } = parsed;
      if (_meta.code !== code) {
        console.warn(
          `[i18n] Locale file "${file}" has _meta.code "${_meta.code}" but filename implies "${code}". Using filename as canonical.`,
        );
      }
      STRINGS[code] = data;
      LANGUAGE_NAMES[code] = _meta.name;
      SUPPORTED_LOCALES.push(code);
    }
  } catch (err) {
    console.warn(`[i18n] Failed to load locales: ${err}`);
  }
}

const EMPTY_FALLBACK = new Proxy({} as LocaleData, { get: () => "" });

export const validateLocale = (lang: string): string => {
  ensureLocales();
  if (SUPPORTED_LOCALES.includes(lang)) return lang;
  console.warn(`Unsupported locale "${lang}", falling back to "${DEFAULT_FALLBACK_LANGUAGE}"`);
  return DEFAULT_FALLBACK_LANGUAGE;
};

export const t = (lang?: string): LocaleData => {
  ensureLocales();
  const locale = lang ? validateLocale(lang) : DEFAULT_FALLBACK_LANGUAGE;
  return STRINGS[locale] ?? STRINGS[DEFAULT_FALLBACK_LANGUAGE] ?? EMPTY_FALLBACK;
};

export function asLang(code: string): Lang {
  return validateLocale(code);
}

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const val = vars[key];
    return val !== undefined ? String(val) : `{${key}}`;
  });
}
