import { type Locale, t } from "../utils";

export const sampleNote = (total: number, sampled: number, lang: Locale = "zh-CN"): string => {
  const s = t(lang);
  if (total > sampled) {
    return s.sampleNote.replace("{total}", String(total)).replace("{sampled}", String(sampled));
  }
  return s.sampleNoteAll.replace("{total}", String(total));
};
