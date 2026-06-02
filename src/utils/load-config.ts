import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { RepoConfig } from "../github";
import { DEFAULT_LANGUAGES } from "./locale-data";
import { toRepoConfig } from "./to-repo-config";

interface RawRepoEntry {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}

interface ScheduleEntry {
  enabled: boolean;
  cron: string;
}

interface RawSchedules {
  daily?: ScheduleEntry;
  weekly?: ScheduleEntry;
  monthly?: ScheduleEntry;
}

interface RawConfig {
  languages?: string[];
  default_primary_language?: string;
  default_fallback_language?: string;
  cli_repos?: RawRepoEntry[];
  skills_repo?: string;
  openclaw?: RawRepoEntry;
  openclaw_peers?: RawRepoEntry[];
  schedules?: RawSchedules;
}

export interface ScheduleConfig {
  daily: ScheduleEntry;
  weekly: ScheduleEntry;
  monthly: ScheduleEntry;
}

const DEFAULT_SCHEDULES: ScheduleConfig = {
  daily: { enabled: true, cron: "0 0 * * *" },
  weekly: { enabled: true, cron: "0 1 * * 1" },
  monthly: { enabled: true, cron: "0 2 1 * *" },
};

export interface RadarConfig {
  cliRepos: RepoConfig[];
  skillsRepo: string;
  openclaw: RepoConfig;
  openclawPeers: RepoConfig[];
  languages: string[];
  schedules: ScheduleConfig;
  defaultPrimaryLanguage: string;
  defaultFallbackLanguage: string;
}

const DEFAULT_CLI_REPOS: RepoConfig[] = [
  { id: "claude-code", repo: "anthropics/claude-code", name: "Claude Code" },
  { id: "codex", repo: "openai/codex", name: "OpenAI Codex" },
  { id: "gemini-cli", repo: "google-gemini/gemini-cli", name: "Gemini CLI" },
  { id: "copilot-cli", repo: "github/copilot-cli", name: "GitHub Copilot CLI" },
  { id: "kimi-cli", repo: "MoonshotAI/kimi-cli", name: "Kimi Code CLI" },
  { id: "opencode", repo: "anomalyco/opencode", name: "OpenCode" },
  { id: "qwen-code", repo: "QwenLM/qwen-code", name: "Qwen Code" },
];

const DEFAULT_SKILLS_REPO = "anthropics/skills";

const DEFAULT_OPENCLAW: RepoConfig = {
  id: "openclaw",
  repo: "openclaw/openclaw",
  name: "OpenClaw",
  paginated: true,
};

const DEFAULT_OPENCLAW_PEERS: RepoConfig[] = [
  { id: "nanobot", repo: "HKUDS/nanobot", name: "NanoBot", paginated: true },
  { id: "hermes-agent", repo: "nousresearch/hermes-agent", name: "Hermes Agent" },
  { id: "picoclaw", repo: "sipeed/picoclaw", name: "PicoClaw", paginated: true },
  { id: "nanoclaw", repo: "qwibitai/nanoclaw", name: "NanoClaw" },
  { id: "nullclaw", repo: "nullclaw/nullclaw", name: "NullClaw" },
  { id: "ironclaw", repo: "nearai/ironclaw", name: "IronClaw" },
  { id: "lobsterai", repo: "netease-youdao/LobsterAI", name: "LobsterAI" },
  { id: "tinyclaw", repo: "TinyAGI/tinyclaw", name: "TinyClaw" },
  { id: "copaw", repo: "agentscope-ai/CoPaw", name: "CoPaw" },
  { id: "moltis", repo: "moltis-org/moltis", name: "Moltis" },
  { id: "zeptoclaw", repo: "qhkm/zeptoclaw", name: "ZeptoClaw" },
  { id: "easyclaw", repo: "gaoyangz77/easyclaw", name: "EasyClaw" },
  { id: "zeroclaw", repo: "zeroclaw-labs/zeroclaw", name: "ZeroClaw" },
];

let _primaryLang: string | null = null;
let _fallbackLang: string | null = null;

export const getPrimaryLang = (): string => {
  if (!_primaryLang) {
    const cfg = loadConfig();
    _primaryLang = cfg.defaultPrimaryLanguage;
    _fallbackLang = cfg.defaultFallbackLanguage;
  }
  return _primaryLang;
};

export const getFallbackLang = (): string => {
  if (!_fallbackLang) getPrimaryLang();
  return _fallbackLang ?? "en-US";
};

export const loadConfig = (configPath = "config.yml"): RadarConfig => {
  const resolved = path.resolve(configPath);

  if (!fs.existsSync(resolved)) {
    console.error(`[config] ${configPath} not found — using built-in defaults.`);
    return {
      cliRepos: DEFAULT_CLI_REPOS,
      skillsRepo: DEFAULT_SKILLS_REPO,
      openclaw: DEFAULT_OPENCLAW,
      openclawPeers: DEFAULT_OPENCLAW_PEERS,
      languages: [...DEFAULT_LANGUAGES],
      schedules: DEFAULT_SCHEDULES,
      defaultPrimaryLanguage: DEFAULT_LANGUAGES[0] ?? "en-US",
      defaultFallbackLanguage: DEFAULT_LANGUAGES[0] ?? "en-US",
    };
  }

  const raw = yaml.load(fs.readFileSync(resolved, "utf-8")) as RawConfig;

  const cliRepos =
    Array.isArray(raw?.cli_repos) && raw.cli_repos.length > 0
      ? raw.cli_repos.map(toRepoConfig)
      : DEFAULT_CLI_REPOS;

  const skillsRepo =
    typeof raw?.skills_repo === "string" && raw.skills_repo.trim()
      ? raw.skills_repo.trim()
      : DEFAULT_SKILLS_REPO;

  const openclaw = raw?.openclaw?.id && raw.openclaw.repo ? toRepoConfig(raw.openclaw) : DEFAULT_OPENCLAW;

  const openclawPeers =
    Array.isArray(raw?.openclaw_peers) && raw.openclaw_peers.length > 0
      ? raw.openclaw_peers.map(toRepoConfig)
      : DEFAULT_OPENCLAW_PEERS;

  const languages =
    Array.isArray(raw?.languages) && raw.languages.length > 0
      ? raw.languages.map(String)
      : [...DEFAULT_LANGUAGES];

  const schedules: ScheduleConfig = {
    daily: raw?.schedules?.daily?.cron
      ? { enabled: raw.schedules.daily.enabled ?? true, cron: raw.schedules.daily.cron }
      : DEFAULT_SCHEDULES.daily,
    weekly: raw?.schedules?.weekly?.cron
      ? { enabled: raw.schedules.weekly.enabled ?? true, cron: raw.schedules.weekly.cron }
      : DEFAULT_SCHEDULES.weekly,
    monthly: raw?.schedules?.monthly?.cron
      ? { enabled: raw.schedules.monthly.enabled ?? true, cron: raw.schedules.monthly.cron }
      : DEFAULT_SCHEDULES.monthly,
  };

  const defaultPrimaryLanguage = raw?.default_primary_language ?? DEFAULT_LANGUAGES[0] ?? "en-US";
  const defaultFallbackLanguage = raw?.default_fallback_language ?? DEFAULT_LANGUAGES[0] ?? "en-US";

  console.error(
    `[config] Loaded from ${configPath}: ` +
      `${cliRepos.length} CLI repos, ${openclawPeers.length} OpenClaw peers, ` +
      `${languages.length} languages`,
  );

  return {
    cliRepos,
    skillsRepo,
    openclaw,
    openclawPeers,
    languages,
    schedules,
    defaultPrimaryLanguage,
    defaultFallbackLanguage,
  };
};
