import { describe, expect, it } from "vitest";
import { emptyState } from "./empty-state";

describe("emptyState", () => {
  it("returns state with both sites having empty seenUrls and lastChecked", () => {
    const state = emptyState();
    expect(state).toEqual({
      anthropic: { lastChecked: "", seenUrls: {} },
      openai: { lastChecked: "", seenUrls: {} },
    });
  });

  it("returns a new object on each call", () => {
    expect(emptyState()).not.toBe(emptyState());
  });
});
