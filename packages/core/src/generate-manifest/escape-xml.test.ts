import { describe, expect, it } from "vitest";
import { escapeXml } from "./escape-xml";

describe("escapeXml", () => {
  it("escapes ampersand", () => {
    expect(escapeXml("A & B")).toBe("A &amp; B");
  });

  it("escapes angle brackets", () => {
    expect(escapeXml("<tag>")).toBe("&lt;tag&gt;");
  });

  it("escapes double quotes", () => {
    expect(escapeXml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("handles multiple escapes in one string", () => {
    expect(escapeXml('A & B < C > D "E"')).toBe("A &amp; B &lt; C &gt; D &quot;E&quot;");
  });

  it("returns unchanged string if no special chars", () => {
    expect(escapeXml("plain text")).toBe("plain text");
  });

  it("handles empty string", () => {
    expect(escapeXml("")).toBe("");
  });
});
