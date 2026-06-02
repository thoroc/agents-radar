import { beforeEach, describe, expect, it, vi } from "vitest";
import { ensureLabel } from "./ensure-label";

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  globalThis.fetch = mockFetch;
});

describe("ensureLabel", () => {
  it("creates a label successfully", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    await ensureLabel("digest-en", "1d76db", "token", "owner/repo");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/owner/repo/labels",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "digest-en", color: "1d76db" }),
      }),
    );
  });

  it("does not throw on 422 (label already exists)", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 422 });

    await expect(ensureLabel("digest-en", "1d76db", "token", "owner/repo")).resolves.toBeUndefined();
  });

  it("throws on other errors", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => "Forbidden",
    });

    await expect(ensureLabel("digest-en", "1d76db", "token", "owner/repo")).rejects.toThrow(
      'Failed to create label "digest-en"',
    );
  });
});
