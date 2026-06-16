import { beforeEach, describe, expect, it } from "vitest";
import { applyDateSearch } from "./apply-date-search";

describe("applyDateSearch", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="date-group" data-date="2024-01-01"><div class="date-hdr"></div></div>
      <div class="date-group" data-date="2024-01-02"><div class="date-hdr"></div></div>
    `;
  });

  it("adds search-hit class on matching dates", () => {
    const index = new Map([
      ["2024-01-01", "hello world"],
      ["2024-01-02", "other content"],
    ]);
    const hits = applyDateSearch("hello", index, true);
    expect(hits).toBe(1);
    const groups = document.querySelectorAll(".date-group");
    expect(groups[0]?.querySelector(".date-hdr")?.classList.contains("search-hit")).toBe(true);
    expect(groups[1]?.querySelector(".date-hdr")?.classList.contains("search-hit")).toBe(false);
  });

  it("removes search-hit when query is empty", () => {
    const index = new Map([["2024-01-01", "hello world"]]);
    applyDateSearch("hello", index, true);
    const hits = applyDateSearch("", index, true);
    expect(hits).toBe(0);
    expect(document.querySelector(".date-hdr")?.classList.contains("search-hit")).toBe(false);
  });

  it("returns 0 and clears hits when index is null", () => {
    const hits = applyDateSearch("hello", null, false);
    expect(hits).toBe(0);
    expect(document.querySelector(".date-hdr")?.classList.contains("search-hit")).toBe(false);
  });
});
