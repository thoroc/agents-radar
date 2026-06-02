import { type Locale, t } from "../utils";

export const sampleNote = (total: number, sampled: number, lang: Locale = "zh"): string => {
  return t(lang).sampleNote.replace("{total}", String(total)).replace("{sampled}", String(sampled));
};
