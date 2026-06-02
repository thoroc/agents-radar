import type { Locale } from "./locale";

type PromptLang = Locale;
export const toPromptLang = (locale: Locale): PromptLang => locale;
