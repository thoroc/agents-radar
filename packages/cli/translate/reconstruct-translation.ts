import type { TranslationCache } from "./cache-types";
import type { SourceSegment } from "./segment-source";

export const reconstructTranslation = (
  segments: SourceSegment[],
  cache: TranslationCache,
  locale: string,
): string =>
  segments
    .map((s) => {
      if (s.isCode || !s.text.trim() || !s.hash) return s.text;
      return cache[s.hash]?.[locale] ?? s.text;
    })
    .join("");
