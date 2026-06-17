import fs from "node:fs";
import path from "node:path";
import type { WebState } from "./web-state-types";

const STATE_FILE = path.join("assets", "digests", "web-state.json");

export const saveWebState = (state: WebState): void => {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
};
