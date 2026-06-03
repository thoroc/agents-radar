import { socialAction as coreSocialAction } from "../../core/src/notifications/social/action";

export type SocialActionArgs = {
  platform: "xiaohongshu" | "wechat" | "wechat:monthly";
};

export type SocialDeps = Record<string, never>;

export const socialAction = async (args: SocialActionArgs): Promise<void> => {
  await coreSocialAction({ platform: args.platform });
};
