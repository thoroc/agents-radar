import { existsSync, readFileSync } from "node:fs";
import type { TranslationCache } from "./cache-types";

export const loadCache = (path: string): TranslationCache => {
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as TranslationCache;
  } catch {
    return {};
  }
};
