import type { Locale } from "./locale";

export type PromptLang = "zh" | "en";
export const toPromptLang = (locale: Locale): PromptLang => (locale === "en" ? "en" : "zh");
