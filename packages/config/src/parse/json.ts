import type { RawConfig } from "../types";

export const parseJson = (content: string): RawConfig => JSON.parse(content) as RawConfig;
