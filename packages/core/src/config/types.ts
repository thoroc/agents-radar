import type { RepoConfig } from "../github";

export interface RawRepoEntry {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}

export interface ScheduleEntry {
  enabled: boolean;
  cron: string;
}

export interface RawSchedules {
  daily?: ScheduleEntry;
  weekly?: ScheduleEntry;
  monthly?: ScheduleEntry;
}

export interface RawConfig {
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
