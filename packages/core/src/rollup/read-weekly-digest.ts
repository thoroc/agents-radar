import fs from "node:fs";
import path from "node:path";
import { DIGESTS_DIR } from "./rollup-constants";

export const readWeeklyDigest = (date: string): string | null => {
  const p = path.join(DIGESTS_DIR, date, "ai-weekly.md");
  if (!fs.existsSync(p)) return null;
  const content = fs.readFileSync(p, "utf-8");
  return content.slice(0, 3000) + (content.length > 3000 ? "\n...[截断]" : "");
};
