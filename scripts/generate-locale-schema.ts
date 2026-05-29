/**
 * Generates JSON Schema from the Zod locale schema.
 *
 * Usage:
 *   pnpm generate-locale-schema
 *
 * Output: locale-schema.json at repo root.
 * Commit this file so IDEs can resolve "$schema" references in locale files.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { LocaleFileSchema } from "../src/locale-schema.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const raw = z.toJSONSchema(LocaleFileSchema, { io: "input" });
const jsonSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "agents-radar locale file",
  description: "Schema for locale JSON files in locales/*.json",
  ...raw,
};

const outputPath = path.join(repoRoot, "locale-schema.json");
fs.writeFileSync(outputPath, JSON.stringify(jsonSchema, null, 2) + "\n");
console.log(`Generated ${outputPath}`);
