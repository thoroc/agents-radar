import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadReport } from "./load-report";

describe("loadReport", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="cwrap"></div>
      <div id="content"></div>
      <div id="sidebar"></div>
    `;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns early without fetching when key is unchanged", async () => {
    const spy = vi.spyOn(globalThis, "fetch");
    const ref = { value: "2024-01-01/ai-cli" };
    await loadReport("2024-01-01", "ai-cli", ref);
    expect(spy).not.toHaveBeenCalled();
  });

  it("updates currentKeyRef to the new key", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      text: async () => "# Report",
    } as Response);
    const ref = { value: null };
    await loadReport("2024-01-01", "ai-cli", ref, false);
    expect(ref.value).toBe("2024-01-01/ai-cli");
  });

  it("renders markdown content on successful fetch", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      text: async () => "# Hello World",
    } as Response);
    const ref = { value: null };
    await loadReport("2024-01-01", "ai-cli", ref, false);
    expect(document.getElementById("content")?.innerHTML).toContain("Hello World");
  });

  it("shows load-failed message on HTTP error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);
    const ref = { value: null };
    await loadReport("2024-01-01", "ai-cli", ref, false);
    expect(document.getElementById("content")?.textContent).toContain("Load failed");
  });

  it("shows load-failed message on network error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("network error"));
    const ref = { value: null };
    await loadReport("2024-01-01", "ai-cli", ref, false);
    expect(document.getElementById("content")?.textContent).toContain("network error");
  });

  it("closes sidebar on load", async () => {
    document.getElementById("sidebar")!.classList.add("open");
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      text: async () => "# content",
    } as Response);
    const ref = { value: null };
    await loadReport("2024-01-01", "ai-cli", ref, false);
    expect(document.getElementById("sidebar")?.classList.contains("open")).toBe(false);
  });
});
