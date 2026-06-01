import { beforeEach, describe, expect, it, vi } from "vitest";

const mockEnsureLabel = vi.fn().mockResolvedValue(undefined);

vi.mock("./ensure-label", () => ({
  ensureLabel: mockEnsureLabel,
}));

import { createGitHubIssue } from "./create-issue";

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  mockEnsureLabel.mockClear();
  globalThis.fetch = mockFetch;
});

describe("createGitHubIssue", () => {
  it("creates an issue and returns its html_url", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ html_url: "https://github.com/owner/repo/issues/42" }),
    });

    const result = await createGitHubIssue(
      "Test Title",
      "Test body content",
      "digest-en",
      "token",
      "owner/repo",
    );

    expect(result).toBe("https://github.com/owner/repo/issues/42");
    expect(mockEnsureLabel).toHaveBeenCalledWith("digest-en", "1d76db", "token", "owner/repo");
  });

  it("ensures the label before creating the issue", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ html_url: "https://github.com/owner/repo/issues/1" }),
    });

    await createGitHubIssue("Title", "Body", "openclaw", "token", "owner/repo");

    expect(mockEnsureLabel).toHaveBeenCalledWith("openclaw", "e11d48", "token", "owner/repo");
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("throws on API error", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 422,
      text: async () => "Validation error",
    });

    await expect(createGitHubIssue("Title", "Body", "label", "token", "owner/repo")).rejects.toThrow(
      "Failed to create issue",
    );
  });

  it("truncates body that exceeds GitHub limit", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ html_url: "..." }),
    });

    const longBody = "x".repeat(70_000);
    await createGitHubIssue("Title", longBody, "label", "token", "owner/repo");

    const callBody = JSON.parse(mockFetch.mock.calls[0]![1].body as string);
    expect(callBody.body.length).toBe(65536);
    expect(callBody.body).toContain("⚠");
  });

  it("neutralizes GitHub references in body", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ html_url: "..." }),
    });

    await createGitHubIssue(
      "Title",
      "Check https://github.com/owner/repo and @user",
      "label",
      "token",
      "owner/repo",
    );

    const callBody = JSON.parse(mockFetch.mock.calls[0]![1].body as string);
    expect(callBody.body).not.toContain("https://github.com/");
    expect(callBody.body).toContain("github\u200B.com");
    expect(callBody.body).not.toContain("@user");
    expect(callBody.body).toContain("@\u200Buser");
  });
});
