import path from "node:path";
import { getLocaleFiles } from "./get-files";
import { sortLocaleFile } from "./sort-file";

export const sort = (repoRoot: string): void => {
  const files = getLocaleFiles(repoRoot);
  for (const file of files) {
    sortLocaleFile(path.resolve(repoRoot, "locales", file));
  }
  console.error(`Sorted ${files.length} locale files.`);
};
