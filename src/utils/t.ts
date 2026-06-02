import { STRINGS } from "./locale-data";
import type { LocaleData } from "./locale-schema";
import { validateLocale } from "./validate-locale";

const EMPTY_FALLBACK = new Proxy({} as LocaleData, { get: () => "" });

export const t = (lang?: string): LocaleData => {
  const locale = lang ? validateLocale(lang) : "en";
  return STRINGS[locale] ?? STRINGS.en ?? EMPTY_FALLBACK;
};
