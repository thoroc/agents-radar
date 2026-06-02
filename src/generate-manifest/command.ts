import { Command } from "@cliffy/command";
import type { GenerateManifestActionArgs } from "./action";
import { generateManifestAction } from "./action";

export const generateManifestCommand = new Command()
  .name("generate-manifest")
  .description("Generate manifest.json and feed.xml from digest directories")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts) => {
    const args: GenerateManifestActionArgs = {
      verbosity: opts.verbose?.length ?? 0,
    };
    await generateManifestAction(args);
  });
