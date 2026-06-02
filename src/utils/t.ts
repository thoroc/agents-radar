import { STRINGS } from "./locale-data";
import type { LocaleData } from "./locale-schema";
import { validateLocale } from "./validate-locale";

export const t = (lang?: string): LocaleData => {
  const locale = lang ? validateLocale(lang) : "en-US";
  return (STRINGS[locale] ?? STRINGS["en-US"]) as LocaleData;
};
