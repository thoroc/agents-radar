import fs from "node:fs";
import path from "node:path";
import { emptyState } from "./empty-state";
import type { WebState } from "./web-state-types";

const STATE_FILE = path.join("digests", "web-state.json");

export const loadWebState = (): WebState => {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as WebState;
  } catch {
    return emptyState();
  }
};
