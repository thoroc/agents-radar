import { Command } from "@cliffy/command";
import { localeAction } from "./action";

export const localeCommand = new Command()
  .name("locale")
  .description("Generate or validate locale schema and types")
  .option("-g, --generate", "Generate locale-schema.json and locale.ts from locale files")
  .option("-v, --validate", "Validate all locale files against locale-schema.json")
  .action(async (options) => {
    if (options.generate && options.validate) {
      console.error("--generate and --validate are mutually exclusive");
      process.exit(1);
    }
    if (!options.generate && !options.validate) {
      console.error("Specify --generate or --validate");
      process.exit(1);
    }
    await localeAction({ generate: !!options.generate, validate: !!options.validate });
  });
