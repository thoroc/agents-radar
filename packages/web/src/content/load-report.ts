import { renderMarkdown } from "../markdown";
import { setContent } from "./set-content";

const BASE_URL = "https://raw.githubusercontent.com/thoroc/agents-radar/main/assets/digests";

export const loadReport = async (
  date: string,
  report: string,
  currentKeyRef: { value: string | null },
  push = true,
): Promise<void> => {
  const key = `${date}/${report}`;
  if (key === currentKeyRef.value) return;
  currentKeyRef.value = key;

  if (push) history.pushState(null, "", `#${key}`);

  document.querySelectorAll<HTMLElement>(".rpt-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset["key"] === key);
  });
  document.querySelectorAll<HTMLElement>(".lang-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset["key"] === key);
  });
  document.querySelectorAll<HTMLElement>(".date-hdr").forEach((h) => {
    const grp = h.closest(".date-group");
    const hasActive = grp?.querySelector(".rpt-btn.active") ?? grp?.querySelector(".lang-btn.active");
    h.classList.toggle("lit", !!hasActive);
  });
  document.querySelectorAll<HTMLElement>(".month-hdr").forEach((h) => {
    const mGrp = h.closest(".month-group");
    const hasActive = mGrp?.querySelector(".lang-btn.active") ?? mGrp?.querySelector(".rpt-btn.active");
    h.classList.toggle("lit", !!hasActive);
  });
  document.querySelectorAll<HTMLElement>(".date-group").forEach((g) => {
    if (g.dataset["date"] === date) {
      g.classList.add("open");
      const monthGrp = g.closest(".month-group");
      if (monthGrp) monthGrp.classList.add("open");
    }
  });

  document.getElementById("sidebar")?.classList.remove("open");

  const cwrap = document.getElementById("cwrap");
  setContent('<div class="msg"><div class="msg-icon">⏳</div><div>Loading…</div></div>');
  if (cwrap) cwrap.scrollTop = 0;

  try {
    const res = await fetch(`${BASE_URL}/${date}/${report}.md`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();
    const safe = renderMarkdown(raw);
    setContent(`<div class="md fade">${safe}</div>`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    setContent(`<div class="msg"><div class="msg-icon">⚠️</div><div>Load failed: ${msg}</div></div>`);
  }
};
