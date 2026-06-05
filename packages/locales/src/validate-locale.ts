import { SUPPORTED_LOCALES } from "./data";

export const validateLocale = (lang: string): string => {
  if (SUPPORTED_LOCALES.includes(lang)) return lang;
  console.warn(`Unsupported locale "${lang}", falling back to "en-US"`);
  return "en-US";
};
