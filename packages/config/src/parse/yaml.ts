import yaml from "js-yaml";
import type { RawConfig } from "../types";

export const parseYaml = (content: string): RawConfig => (yaml.load(content) ?? {}) as RawConfig;
