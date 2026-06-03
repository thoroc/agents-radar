import { Command } from "@cliffy/command";
import type { ManifestActionArgs } from "./action";
import { manifestAction } from "./action";

export const manifestCommand = new Command()
  .name("manifest")
  .description("Generate manifest.json and feed.xml from digest directories")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts) => {
    const args: ManifestActionArgs = {
      verbosity: opts.verbose?.length ?? 0,
    };
    await manifestAction(args);
  });
