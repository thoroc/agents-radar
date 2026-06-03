import { Command } from "@cliffy/command";
import type { SocialActionArgs } from "./action";
import { socialAction } from "./action";

export const socialCommand = new Command()
  .name("social")
  .description("Generate social media articles from digest reports (xiaohongshu, wechat)")
  .arguments("<platform:string>")
  .action(async (_opts, platform: string) => {
    const validPlatforms = ["xiaohongshu", "wechat", "wechat:monthly"] as const;
    if (!validPlatforms.includes(platform as (typeof validPlatforms)[number])) {
      console.error(`[social] Invalid platform "${platform}". Valid: ${validPlatforms.join(", ")}`);
      process.exit(1);
    }
    const args: SocialActionArgs = {
      platform: platform as "xiaohongshu" | "wechat" | "wechat:monthly",
    };
    await socialAction(args);
  });
