import fs from "node:fs";
import path from "node:path";
import { DIGESTS_DIR } from "./constants";
import { FsDeps } from "./types";

export const getRecentDates = (n: number, deps: Pick<FsDeps, "readdirSync" | "existsSync">): string[] => {
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  return deps
    .readdirSync(DIGESTS_DIR)
    .filter(
      (d) =>
        dateRe.test(d) &&
        deps.existsSync(path.join(DIGESTS_DIR, d)) &&
        fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory(),
    )
    .sort()
    .reverse()
    .slice(0, n);
};