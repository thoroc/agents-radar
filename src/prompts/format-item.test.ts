import { describe, expect, it } from "vitest";
import type { GitHubItem } from "../github/types";
import { formatItem } from "./format-item";

const makeItem = (overrides: Partial<GitHubItem> = {}): GitHubItem => ({
  number: 1,
  title: "Issue",
  state: "open",
  user: { login: "alice" },
  labels: [],
  created_at: "2026-03-09T00:00:00Z",
  updated_at: "2026-03-09T12:00:00Z",
  comments: 5,
  reactions: { "+1": 2 },
  body: "body",
  html_url: "https://github.com/org/test/issues/1",
  ...overrides,
});

describe("formatItem", () => {
  it("formats a basic item in Chinese (default)", () => {
    const result = formatItem(makeItem());
    expect(result).toContain("#1 [OPEN]");
    expect(result).toContain("Issue");
    expect(result).toContain(": alice");
    expect(result).toContain(": 5");
    expect(result).toContain("👍: 2");
    expect(result).toContain("org/test Issue #1");
    expect(result).toContain(": body");
  });

  it("formats an item in English", () => {
    const result = formatItem(makeItem(), "en");
    expect(result).toContain(": alice");
    expect(result).toContain(": 5");
    expect(result).toContain("org/test Issue #1");
    expect(result).toContain(": body");
  });

  it("includes labels when present", () => {
    const item = makeItem({ labels: [{ name: "bug" }, { name: "critical" }] });
    const result = formatItem(item);
    expect(result).toContain("[bug, critical]");
  });

  it("shows no label bracket when labels empty", () => {
    const result = formatItem(makeItem({ labels: [] }));
    expect(result).toContain("#1 [OPEN] Issue");
    expect(result).not.toContain("[]");
  });

  it("truncates body at 300 chars with ellipsis", () => {
    const longBody = "A".repeat(400);
    const result = formatItem(makeItem({ body: longBody }));
    expect(result).toContain(`${"A".repeat(300)}...`);
  });

  it("does not add ellipsis for body <= 300 chars", () => {
    const result = formatItem(makeItem({ body: "Short body" }));
    expect(result).toContain("Short body");
    expect(result).not.toContain("...");
  });

  it("handles null body gracefully", () => {
    const result = formatItem(makeItem({ body: null }));
    expect(result).toContain("摘要: ");
  });

  it("handles missing reactions gracefully", () => {
    const result = formatItem(makeItem({ reactions: undefined }));
    expect(result).toContain("👍: 0");
  });

  it("replaces newlines in body with spaces", () => {
    const result = formatItem(makeItem({ body: "line1\nline2\nline3" }));
    expect(result).toContain("line1 line2 line3");
  });

  it("shows closed state uppercase", () => {
    const result = formatItem(makeItem({ state: "closed" }));
    expect(result).toContain("[CLOSED]");
  });
});
