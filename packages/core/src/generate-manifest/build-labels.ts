import { getPrimaryLang, STRINGS, SUPPORTED_LOCALES } from "../utils";
import { REPORT_FILES } from "./constants";

export const buildLabels = (): Record<string, string> => {
  const labels: Record<string, string> = {};
  const baseIds = REPORT_FILES.filter((id) => !id.endsWith("-en"));
  for (const lang of SUPPORTED_LOCALES) {
    const s = STRINGS[lang];
    if (!s) continue;
    const suffix = lang === getPrimaryLang() ? "" : `.${lang}`;
    for (const id of baseIds) {
      const key = id + suffix;
      const base = id.startsWith("ai-") ? id.slice(3) : id;
      const localeKey = `reportLabelAi${base
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("")}` as keyof typeof s;
      labels[key] = (s[localeKey] as string) ?? key;
    }
  }
  return labels;
};
