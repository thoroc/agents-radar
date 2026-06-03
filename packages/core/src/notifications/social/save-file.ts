import path from "path";
import { SOCIAL_DIR } from "./constants";
import { FsDeps } from "./types";

export const saveFile = (content: string, filename: string, deps: FsDeps): string => {
  deps.mkdirSync(SOCIAL_DIR, { recursive: true });
  const filepath = path.join(SOCIAL_DIR, filename);
  deps.writeFileSync(filepath, content, "utf-8");
  return filepath;
};