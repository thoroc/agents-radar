import { Command, EnumType } from "@cliffy/command";
import { socialAction } from "./action";
import type { SocialActionArgs } from "./action";

const platformType = new EnumType(["xiaohongshu", "wechat", "wechat:monthly"] as const);

export const socialCommand = new Command()
  .name("social")
  .description("Generate social media content from daily digests")
  .type("platform", platformType)
  .arguments("<platform:platform>")
  .option("-V, --verbose", "Enable verbose output", { collect: true })
  .action(async (opts, platform: string) => {
    const args: SocialActionArgs = {
      platform: platform as "xiaohongshu" | "wechat" | "wechat:monthly",
      verbosity: opts.verbose?.length ?? 0,
    };
    await socialAction(args);
  });
