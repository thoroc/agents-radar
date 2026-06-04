import fs from "node:fs";
import path from "node:path";

const CANDIDATES = ["config.yml", "config.yaml", "config.json", "config.toml"] as const;

export const findConfig = (dir: string = process.cwd()): string | undefined => {
  for (const name of CANDIDATES) {
    const candidate = path.join(dir, name);
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
};
