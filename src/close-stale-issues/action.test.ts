import { beforeEach, describe, expect, it, vi } from "vitest";

const mockCloseStaleIssues = vi.fn<(days: number) => Promise<number>>();

vi.mock("../github", () => ({
  closeStaleIssues: mockCloseStaleIssues,
}));

vi.mock("@dotenvx/dotenvx", () => ({
  default: { config: vi.fn() },
}));

import { closeStaleIssuesAction } from "./action";

describe("closeStaleIssuesAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCloseStaleIssues.mockResolvedValue(5);
  });

  it("calls closeStaleIssues with 7 days", async () => {
    await closeStaleIssuesAction({ verbosity: 0 });
    expect(mockCloseStaleIssues).toHaveBeenCalledWith(7);
  });

  it("logs the number of closed issues", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await closeStaleIssuesAction({ verbosity: 0 });
    expect(spy).toHaveBeenCalledWith("[close-stale] Closed 5 issue(s) older than 7 days.");
    spy.mockRestore();
  });

  it("does not log threshold at verbosity 0", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await closeStaleIssuesAction({ verbosity: 0 });
    expect(spy).not.toHaveBeenCalledWith("[close-stale] Stale threshold: 7 days");
    spy.mockRestore();
  });

  it("logs threshold at verbosity 1", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await closeStaleIssuesAction({ verbosity: 1 });
    expect(spy).toHaveBeenCalledWith("[close-stale] Stale threshold: 7 days");
    spy.mockRestore();
  });
});
