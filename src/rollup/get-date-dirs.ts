import fs from "node:fs";
import path from "node:path";
import { DIGESTS_DIR } from "./rollup-constants";

export const getDateDirs = (): string[] => {
  if (!fs.existsSync(DIGESTS_DIR)) return [];
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse();
};
