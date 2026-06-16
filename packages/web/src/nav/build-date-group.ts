export const buildDateGroup = (
  date: string,
  reports: string[],
  isFirst: boolean,
  manifestLabels: Record<string, string>,
  onLoad: (date: string, report: string) => void,
): HTMLElement => {
  const grp = document.createElement("div");
  grp.className = "date-group" + (isFirst ? " open" : "");
  grp.dataset["date"] = date;

  const hdr = document.createElement("div");
  hdr.className = "date-hdr";
  const dayLabel = date.slice(8);
  hdr.appendChild(document.createTextNode(dayLabel + " "));
  const arrSpan = document.createElement("span");
  arrSpan.className = "arr";
  arrSpan.textContent = "▶";
  hdr.appendChild(arrSpan);
  hdr.onclick = () => grp.classList.toggle("open");

  const list = document.createElement("div");
  list.className = "rpt-list";

  const baseReports = reports.filter((r) => !r.endsWith("-en"));
  baseReports.forEach((r) => {
    const enKey = r + "-en";
    const hasEn = reports.includes(enKey);

    if (hasEn) {
      const row = document.createElement("div");
      row.className = "rpt-row";

      const labelEl = document.createElement("span");
      labelEl.className = "rpt-label";
      const baseLabel = manifestLabels[r] ?? r;
      labelEl.textContent = baseLabel;
      labelEl.title = baseLabel;

      const btns = document.createElement("div");
      btns.className = "lang-btns";

      const zhBtn = document.createElement("button");
      zhBtn.className = "lang-btn";
      zhBtn.dataset["key"] = `${date}/${r}`;
      zhBtn.textContent = "ZH";
      zhBtn.onclick = () => onLoad(date, r);

      const enBtn = document.createElement("button");
      enBtn.className = "lang-btn";
      enBtn.dataset["key"] = `${date}/${enKey}`;
      enBtn.textContent = "EN";
      enBtn.onclick = () => onLoad(date, enKey);

      btns.append(zhBtn, enBtn);
      row.append(labelEl, btns);
      list.appendChild(row);
    } else {
      const btn = document.createElement("button");
      btn.className = "rpt-btn";
      btn.dataset["key"] = `${date}/${r}`;
      btn.textContent = manifestLabels[r] ?? r;
      btn.onclick = () => onLoad(date, r);
      list.appendChild(btn);
    }
  });

  grp.append(hdr, list);
  return grp;
};
