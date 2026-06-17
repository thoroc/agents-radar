import { createHash } from "node:crypto";

export const hashSegment = (text: string): string =>
  createHash("sha256").update(text.trim()).digest("hex").slice(0, 16);
