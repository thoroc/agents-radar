export interface WebPageItem {
  url: string;
  title: string;
  lastmod: string;
  content: string;
  site: "anthropic" | "openai";
  category: string;
}

interface SiteState {
  lastChecked: string;
  seenUrls: Record<string, string>;
}

export interface WebState {
  anthropic: SiteState;
  openai: SiteState;
}

export interface WebFetchResult {
  site: "anthropic" | "openai";
  siteName: string;
  isFirstRun: boolean;
  newItems: WebPageItem[];
  totalDiscovered: number;
}

export interface SiteConfig {
  name: string;
  sitemapUrl: string;
  prefixes?: string[];
  subSitemapNames?: string[];
  subSitemapTemplate?: string;
  metadataOnly?: boolean;
}
