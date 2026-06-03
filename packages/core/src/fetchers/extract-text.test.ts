import { describe, expect, it } from "vitest";
import { extractText } from "./extract-text";

describe("extractText", () => {
  it("returns trimmed text from main element", () => {
    const html = "<html><body><main><p>Hello world</p></main></body></html>";
    expect(extractText(html)).toBe("Hello world");
  });

  it("falls back to article element when main is absent", () => {
    const html = "<html><body><article><p>Article content</p></article></body></html>";
    expect(extractText(html)).toBe("Article content");
  });

  it("falls back to entire html when neither main nor article exist", () => {
    const html = "<p>Plain content</p>";
    expect(extractText(html)).toBe("Plain content");
  });

  it("strips script tags", () => {
    const html = "<main><script>alert('x')</script><p>Visible</p></main>";
    expect(extractText(html)).toBe("Visible");
  });

  it("strips style tags", () => {
    const html = "<main><style>.cls{color:red}</style><p>Styled</p></main>";
    expect(extractText(html)).toBe("Styled");
  });

  it("decodes HTML entities", () => {
    const html = "<main><p>&amp; &lt; &gt; &quot; &#39; &nbsp;</p></main>";
    expect(extractText(html)).toBe("& < > \" '");
  });

  it("collapses whitespace", () => {
    const html = "<main><p>Hello    world</p><p>  foo  </p></main>";
    expect(extractText(html)).toBe("Hello world foo");
  });

  it("trims result", () => {
    const html = "<main>  <p>Spaced out</p>  </main>";
    expect(extractText(html)).toBe("Spaced out");
  });

  it("returns empty string for empty input", () => {
    expect(extractText("")).toBe("");
  });

  it("limits content length", () => {
    const longText = "a".repeat(2000);
    const html = `<main><p>${longText}</p></main>`;
    expect(extractText(html).length).toBe(1500);
  });

  it("handles malformed HTML gracefully", () => {
    const html = "<main><p>Unclosed";
    expect(extractText(html)).toBe("Unclosed");
  });
});
