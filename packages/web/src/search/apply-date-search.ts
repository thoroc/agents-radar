export const applyDateSearch = (
  query: string,
  searchIndex: Map<string, string> | null,
  _searchReady: boolean,
): number => {
  const needle = query.trim().toLowerCase();
  let hits = 0;

  document.querySelectorAll<HTMLElement>(".date-group").forEach((grp) => {
    const hdr = grp.querySelector(".date-hdr");
    if (!hdr) return;

    if (!needle || !searchIndex) {
      hdr.classList.remove("search-hit");
      return;
    }

    const text = searchIndex.get(grp.dataset["date"] ?? "") ?? "";
    const matched = text.includes(needle);
    hdr.classList.toggle("search-hit", matched);
    if (matched) hits += 1;
  });

  return hits;
};
