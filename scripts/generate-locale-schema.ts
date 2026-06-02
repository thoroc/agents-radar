import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LocaleFileSchema } from "../src/utils/locale-schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generate = () => {
  const schema = LocaleFileSchema.toJSONSchema();
  const output = JSON.stringify(schema, null, 2);
  const outPath = path.resolve(__dirname, "../locale-schema.json");
  fs.writeFileSync(outPath, output + "\n");
  console.error(`Generated locale-schema.json at ${outPath}`);
};

generate();
