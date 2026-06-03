export const getWebhookUrls = (env: NodeJS.ProcessEnv = process.env): string[] => {
  const raw = env.FEISHU_WEBHOOK_URLS ?? env.FEISHU_WEBHOOK_URL ?? "";
  return raw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
};
