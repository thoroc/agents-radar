import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { TranslationCache } from "./cache-types";

export const saveCache = (path: string, cache: TranslationCache): void => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(cache, null, 2)}\n`, "utf-8");
};
