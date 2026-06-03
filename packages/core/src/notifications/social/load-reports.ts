import path from "path";
import { SOURCE_REPORTS, DIGESTS_DIR } from "./constants";
import { FsDeps } from "./types";

export const loadReports = (
  date: string,
  deps: Pick<FsDeps, "readFileSync" | "existsSync">,
  truncate = 3000,
): string => {
  const sections: string[] = [];
  for (const report of SOURCE_REPORTS) {
    const filePath = path.join(DIGESTS_DIR, date, `${report}.md`);
    if (deps.existsSync(filePath)) {
      const content = deps.readFileSync(filePath, "utf-8");
      sections.push(`## [${report}]\n\n${content.slice(0, truncate)}`);
    }
  }
  return sections.join("\n\n---\n\n");
};