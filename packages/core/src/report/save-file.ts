import fs from "node:fs";
import path from "node:path";

export const saveFile = (content: string, ...segments: string[]): string => {
  const filepath = path.join("assets", "digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
};
