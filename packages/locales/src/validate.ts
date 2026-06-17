import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv/dist/2020";
import { getLocaleFiles } from "./get-files";

export const validate = (repoRoot: string): boolean => {
  const schemaPath = path.resolve(repoRoot, "assets/locale-schema.json");
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  let allValid = true;
  for (const file of getLocaleFiles(repoRoot)) {
    const data = JSON.parse(fs.readFileSync(path.resolve(repoRoot, "locales", file), "utf-8"));
    if (!validate(data)) {
      console.error(`${file}:`, JSON.stringify(validate.errors, null, 2));
      allValid = false;
    }
  }

  return allValid;
};
