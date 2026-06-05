import type { ManifestEntry } from "../types";
import { buildDateGroup } from "./build-date-group";

export const buildMonthGroup = (
  month: string,
  entries: ManifestEntry[],
  isFirstMonth: boolean,
  isFirstDateRef: { value: boolean },
  manifestLabels: Record<string, string>,
  onLoad: (date: string, report: string) => void,
): HTMLElement => {
  const mGrp = document.createElement("div");
  mGrp.className = "month-group" + (isFirstMonth ? " open" : "");

  const mHdr = document.createElement("div");
  mHdr.className = "month-hdr";
  mHdr.appendChild(document.createTextNode(month + " "));
  const mArr = document.createElement("span");
  mArr.className = "arr";
  mArr.textContent = "▶";
  mHdr.appendChild(mArr);
  mHdr.onclick = () => mGrp.classList.toggle("open");

  const mBody = document.createElement("div");
  mBody.className = "month-body";

  entries.forEach(({ date, reports }) => {
    mBody.appendChild(buildDateGroup(date, reports, isFirstDateRef.value, manifestLabels, onLoad));
    isFirstDateRef.value = false;
  });

  mGrp.append(mHdr, mBody);
  return mGrp;
};
