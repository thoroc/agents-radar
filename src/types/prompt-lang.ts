import type { Locale } from "./locale";

export type PromptLang = Locale;
export const toPromptLang = (locale: Locale): PromptLang => locale;
