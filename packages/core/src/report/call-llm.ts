import { createProvider, type LlmProvider, type ProviderName } from "@agents-radar/providers";
import { sleep } from "../utils";
import { is429 } from "./is-429";
import { LLM_TOKENS_DEFAULT } from "./report-constants";

type CallLlmDeps = {
  provider?: LlmProvider;
  sleep?: (ms: number) => Promise<void>;
};

const getFallbackProvider = (env: NodeJS.ProcessEnv = process.env): LlmProvider | null => {
  if (!env.DEEPSEEK_API_KEY) return null;
  return createProvider("deepseek" as ProviderName, env);
};

const LLM_CONCURRENCY = 5;
const MAX_RETRIES = 3;
const RETRY_BASE_MS = 5_000;

const is403 = (err: unknown): boolean => {
  const status =
    typeof err === "object" && err !== null ? (err as Record<string, unknown>).status : undefined;
  return status === 403 || String(err).includes("permission_error");
};

const createLlmCaller = (concurrency = LLM_CONCURRENCY, env: NodeJS.ProcessEnv = process.env) => {
  let slots = concurrency;
  const queue: Array<() => void> = [];

  const acquireSlot = (): Promise<void> => {
    if (slots > 0) {
      slots--;
      return Promise.resolve();
    }
    return new Promise((resolve) => queue.push(resolve));
  };

  const releaseSlot = (): void => {
    const next = queue.shift();
    if (next) {
      next();
    } else {
      slots++;
    }
  };

  return async (prompt: string, maxTokens = LLM_TOKENS_DEFAULT, deps: CallLlmDeps = {}): Promise<string> => {
    const provider = deps.provider ?? createProvider(undefined, env);
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
};

export const callLlm = createLlmCaller();
