import { DEFAULT_FALLBACK_LANGUAGE, SUPPORTED_LOCALES } from "./locale-data";

export const validateLocale = (lang: string): string => {
  if (SUPPORTED_LOCALES.includes(lang)) return lang;
  console.warn(`Unsupported locale "${lang}", falling back to "${DEFAULT_FALLBACK_LANGUAGE}"`);
  return DEFAULT_FALLBACK_LANGUAGE;
};
