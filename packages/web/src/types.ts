export interface ManifestEntry {
  date: string;
  reports: string[];
}

export interface ManifestData {
  dates: ManifestEntry[];
  labels?: Record<string, string>;
}
