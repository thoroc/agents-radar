import path from "node:path";

export const detectFormat = (filePath: string): "yaml" | "json" | "toml" => {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".yml" || ext === ".yaml") return "yaml";
  if (ext === ".json") return "json";
  if (ext === ".toml") return "toml";
  throw new Error(`Unsupported config format: "${ext || "(none)"}"`);
};
