import { STRINGS } from "./data";
import type { LocaleData } from "./schema";
import { validateLocale } from "./validate-locale";

export const t = (lang?: string): LocaleData => {
  const locale = lang ? validateLocale(lang) : "en-US";
  return (STRINGS[locale] ?? STRINGS["en-US"]) as LocaleData;
};
