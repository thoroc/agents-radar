import { createDeepSeekProvider } from "../providers/deepseek";
import { createProvider, type LlmProvider } from "../providers/index";
import { sleep } from "../utils";
import { is429 } from "./is-429";
import { LLM_TOKENS_DEFAULT } from "./report-constants";

type CallLlmDeps = {
  provider?: LlmProvider;
  sleep?: (ms: number) => Promise<void>;
};

const getFallbackProvider = (env: NodeJS.ProcessEnv = process.env): LlmProvider | null => {
  const key = env.DEEPSEEK_API_KEY;
  if (!key) return null;
  return createDeepSeekProvider(key);
};

const LLM_CONCURRENCY = 5;
let llmSlots = LLM_CONCURRENCY;
const llmQueue: Array<() => void> = [];

const acquireSlot = (): Promise<void> => {
  if (llmSlots > 0) {
    llmSlots--;
    return Promise.resolve();
  }
  return new Promise((resolve) => llmQueue.push(resolve));
};

const releaseSlot = (): void => {
  const next = llmQueue.shift();
  if (next) {
    next();
  } else {
    llmSlots++;
  }
};

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 5_000;

const is403 = (err: unknown): boolean => {
  return (err as { status?: number })?.status === 403 || String(err).includes("permission_error");
};

export const callLlm = async (
  prompt: string,
  maxTokens = LLM_TOKENS_DEFAULT,
  deps: CallLlmDeps = {},
  env: NodeJS.ProcessEnv = process.env,
): Promise<string> => {
  const provider = deps.provider ?? createProvider();
  for (let attempt = 0; ; attempt++) {
    await acquireSlot();
    let released = false;
    try {
      return await provider.call(prompt, maxTokens);
    } catch (err) {
      if (attempt < MAX_RETRIES && is429(err)) {
        releaseSlot();
        released = true;
        const wait = RETRY_BASE_MS * 2 ** attempt;
        console.error(`[llm] 429 — retry ${attempt + 1}/${MAX_RETRIES} in ${wait / 1000}s...`);
        await (deps.sleep ?? sleep)(wait);
        continue;
      }
      if (is403(err)) {
        const fb = getFallbackProvider(env);
        if (fb) {
          console.error(`[llm] 403 quota exceeded — switching to fallback provider`);
          return await fb.call(prompt, maxTokens);
        }
      }
      throw err;
    } finally {
      if (!released) releaseSlot();
    }
  }
};
