import fs from "node:fs";
import path from "node:path";
import { DIGESTS_DIR, MAX_CHARS_PER_REPORT, ROLLUP_SOURCES } from "./rollup-constants";

export const readDailyDigest = (date: string): string | null => {
  const parts: string[] = [];
  for (const type of ROLLUP_SOURCES) {
    const p = path.join(DIGESTS_DIR, date, `${type}.md`);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf-8");
      const truncated = content.slice(0, MAX_CHARS_PER_REPORT);
      parts.push(truncated.length < content.length ? `${truncated}\n...[摘要截断]` : truncated);
    }
  }
  return parts.length > 0 ? parts.join("\n\n") : null;
};
