import { createProvider, type LlmProvider, type ProviderName } from "@agents-radar/providers";

export const getFallbackProvider = (env: NodeJS.ProcessEnv = process.env): LlmProvider | null => {
  if (!env.DEEPSEEK_API_KEY) return null;
  return createProvider("deepseek" as ProviderName, env);
};
