import { type Locale, t } from "../utils";

export const sampleNote = (total: number, sampled: number, lang: Locale = "zh"): string => {
  if (total <= sampled) {
    return t(lang).sampleNoteAll.replace("{total}", String(total));
  }
  return t(lang).sampleNote.replace("{total}", String(total)).replace("{sampled}", String(sampled));
};
