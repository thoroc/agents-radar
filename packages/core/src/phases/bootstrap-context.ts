import { DateTime } from "luxon";
import { loadWebState } from "../fetchers";
import { requireEnv } from "../require-env";
import { getEnabledLangs, type Locale, loadConfig, toCstDateStr, toUtcStr } from "../utils";

type BootstrapContextDeps = {
  loadConfig?: typeof loadConfig;
  loadWebState?: typeof loadWebState;
};

export const bootstrapContext = (env: NodeJS.ProcessEnv = process.env, deps: BootstrapContextDeps = {}) => {
  requireEnv("GITHUB_TOKEN", env);
  const _loadConfig = deps.loadConfig ?? loadConfig;
  const _loadWebState = deps.loadWebState ?? loadWebState;
  const { cliRepos, skillsRepo, openclaw, openclawPeers, languages } = _loadConfig();
  const enabledLangs = getEnabledLangs(languages, env) as Locale[];
  const now = DateTime.now();
  return {
    cliRepos,
    skillsRepo,
    openclaw,
    openclawPeers,
    allConfigs: [...cliRepos, openclaw, ...openclawPeers],
    enabledLangs,
    since: now.minus({ hours: 24 }),
    dateStr: toCstDateStr(now),
    utcStr: toUtcStr(now),
    digestRepo: env.DIGEST_REPO ?? "",
    webState: _loadWebState(),
  };
};
