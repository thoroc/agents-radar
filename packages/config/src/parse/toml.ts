import { parse } from "smol-toml";
import type { RawConfig } from "../types";

export const parseToml = (content: string): RawConfig => {
  const raw: Record<string, unknown> = parse(content);
  return raw as RawConfig;
};
