import fs from "node:fs";
import path from "node:path";

export const getLocaleFiles = (repoRoot: string): string[] =>
  fs
    .readdirSync(path.resolve(repoRoot, "locales"))
    .filter((f) => f.endsWith(".json"))
    .sort();
