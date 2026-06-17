import "./styles/app.css";
import { loadReport, showManifestError } from "./content";
import { buildNav } from "./nav";
import { getHash } from "./router";
import { wireSearch } from "./search/wire";
import { wireThemeToggle } from "./theme/wire-toggle";
import type { ManifestData } from "./types";

export const boot = async (): Promise<void> => {
  wireThemeToggle();

  const mobToggle = document.getElementById("mob-toggle");
  const sidebar = document.getElementById("sidebar");
  if (mobToggle && sidebar) mobToggle.onclick = () => sidebar.classList.toggle("open");

  try {
    const res = await fetch("./assets/manifest.json");
    if (!res.ok) throw new Error("assets/manifest.json not found");
    const data = (await res.json()) as ManifestData;
    if (!data.dates?.length) throw new Error("manifest is empty");

    const manifestLabels = data.labels ?? {};
    const currentKeyRef = { value: null as string | null };

    buildNav(data.dates, manifestLabels, (date, report) => {
      void loadReport(date, report, currentKeyRef);
    });

    wireSearch(data.dates);

    const hash = getHash();
    const first = data.dates[0];
    if (hash && data.dates.find((d) => d.date === hash.date && d.reports.includes(hash.report))) {
      void loadReport(hash.date, hash.report, currentKeyRef, false);
    } else if (first?.reports?.length) {
      const r0 = first.reports[0]!;
      history.replaceState(null, "", `#${first.date}/${r0}`);
      void loadReport(first.date, r0, currentKeyRef, false);
    }

    window.addEventListener("popstate", () => {
      const h = getHash();
      if (h) void loadReport(h.date, h.report, currentKeyRef, false);
    });
  } catch (e) {
    showManifestError(e instanceof Error ? e.message : String(e));
  }
};

void boot();
