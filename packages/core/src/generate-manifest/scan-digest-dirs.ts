import fs from "node:fs";
import path from "node:path";
import { DATE_RE, DIGESTS_DIR, REPORT_FILES } from "./constants";
import type { DateEntry } from "./types";

export const scanDigestDirs = (): DateEntry[] =>
  fs
    .readdirSync(DIGESTS_DIR)
    .filter((name) => DATE_RE.test(name) && fs.statSync(path.join(DIGESTS_DIR, name)).isDirectory())
    .sort()
    .reverse()
    .map((date) => ({
      date,
      reports: REPORT_FILES.filter((r) => fs.existsSync(path.join(DIGESTS_DIR, date, `${r}.md`))),
    }))
    .filter((e) => e.reports.length > 0);
