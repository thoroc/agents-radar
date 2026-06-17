import { Command } from "@cliffy/command";
import type { TranslateActionArgs } from "./action";
import { translateAction } from "./action";

export const translateCommand = new Command()
  .name("translate")
  .description("Translate a Markdown file into all supported languages via Google Cloud Translation")
  .option("--file <file:string>", "Source file to translate", { default: "README.md" })
  .option("-V, --verbose", "Verbosity level: -V progress per locale", { collect: true })
  .action(async (opts): Promise<void> => {
    const args: TranslateActionArgs = {
      file: opts.file ?? "README.md",
      verbosity: opts.verbose?.length ?? 0,
    };
    await translateAction(args);
  });
