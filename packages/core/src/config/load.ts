import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { toRepoConfig } from "../github";
import { DEFAULT_LANGUAGES } from "../locales";
import {
  DEFAULT_CLI_REPOS,
  DEFAULT_OPENCLAW,
  DEFAULT_OPENCLAW_PEERS,
  DEFAULT_SCHEDULES,
  DEFAULT_SKILLS_REPO,
} from "./constants";
import type { RadarConfig, RawConfig, ScheduleConfig } from "./types";

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
