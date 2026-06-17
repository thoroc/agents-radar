import { Command } from "@cliffy/command";
import { localeAction } from "./action";

export const localeCommand = new Command()
  .name("locale")
  .description("Generate, validate, or sort locale schema and types")
  .option("-g, --generate", "Generate locale-schema.json and locale.ts from locale files")
  .option("-v, --validate", "Validate all locale files against locale-schema.json")
  .option("-s, --sort", "Sort all locale JSON files alphabetically (pins $schema and _meta first)")
  .action(async (options) => {
    const flagCount = [options.generate, options.validate, options.sort].filter(Boolean).length;
    if (flagCount > 1) {
      console.error("--generate, --validate, and --sort are mutually exclusive");
      process.exit(1);
    }
    if (flagCount === 0) {
      console.error("Specify --generate, --validate, or --sort");
      process.exit(1);
    }
    await localeAction({ generate: !!options.generate, validate: !!options.validate, sort: !!options.sort });
  });
