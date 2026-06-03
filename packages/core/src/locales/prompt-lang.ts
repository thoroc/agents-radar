import type { Locale } from "../types/locale";

type PromptLang = Locale;
export const toPromptLang = (locale: Locale): PromptLang => locale;
