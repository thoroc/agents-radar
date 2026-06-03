import { PAGES_URL } from "../types";
import type { FetcherDeps } from "./types";

export const resolveUrl = (deps: FetcherDeps | undefined): string => deps?.pagesUrl ?? PAGES_URL;
