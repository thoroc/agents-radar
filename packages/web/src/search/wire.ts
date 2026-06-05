import type { ManifestEntry } from "../types";
import { applyDateSearch } from "./apply-date-search";
import { buildSearchIndex } from "./build-search-index";
import { debounce } from "./debounce";
import { setSearchStatus } from "./set-status";

export const wireSearch = (dates: ManifestEntry[]): void => {
  let searchIndex: Map<string, string> | null = null;
  let searchReady = false;
  let searchQuery = "";
  const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;

  setSearchStatus("索引准备中…");
  buildSearchIndex(dates).then((idx) => {
    searchIndex = idx;
    searchReady = true;
    const hits = applyDateSearch(searchQuery, searchIndex, searchReady);
    setSearchStatus(searchQuery.trim() ? `匹配 ${hits} 天` : "");
  });

  searchInput?.addEventListener(
    "input",
    debounce(() => {
      searchQuery = searchInput.value;
      const hits = applyDateSearch(searchQuery, searchIndex, searchReady);
      if (!searchQuery.trim()) setSearchStatus("");
      else if (!searchReady) setSearchStatus("正在建立索引…");
      else setSearchStatus(`匹配 ${hits} 天`);
    }, 120),
  );
};
