export interface DateEntry {
  date: string;
  reports: string[];
}

export interface Manifest {
  generated: string;
  dates: DateEntry[];
  labels: Record<string, string>;
}
