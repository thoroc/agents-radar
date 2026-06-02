import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { LocaleFileSchema } from "../src/utils/locale-schema";
const raw = z.toJSONSchema(LocaleFileSchema, { io: "input" });
const jsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "agents-radar locale file",
  description: "Schema for locale JSON files in locales/*.json",
  ...raw,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, "..", "locale-schema.json");
fs.writeFileSync(outputPath, JSON.stringify(jsonSchema, null, 2) + "\n");
console.log(`Generated ${outputPath}`);
