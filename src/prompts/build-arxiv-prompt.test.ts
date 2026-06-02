import { describe, expect, it } from "vitest";
import type { ArxivData } from "../fetchers/arxiv";
import { buildArxivPrompt } from "./build-arxiv-prompt";

const makeData = (overrides: Partial<ArxivData> = {}): ArxivData => ({
  papers: [
    {
      id: "2403.001",
      title: "Large Language Models as Few-Shot Learners",
      summary: "We demonstrate that scaling up language models greatly improves task performance.",
      authors: ["Alice Smith", "Bob Jones", "Carol Lee", "David Wang"],
      published: "2026-03-09T00:00:00Z",
      updated: "2026-03-09T12:00:00Z",
      categories: ["cs.CL", "cs.AI", "cs.LG"],
      url: "https://arxiv.org/abs/2403.001",
      pdfUrl: "https://arxiv.org/pdf/2403.001",
    },
    {
      id: "2403.002",
      title: "A New Approach to Multi-Agent Planning",
      summary: "Short summary.",
      authors: ["Eve Zhang"],
      published: "2026-03-09T00:00:00Z",
      updated: "2026-03-09T00:00:00Z",
      categories: ["cs.AI", "cs.MA"],
      url: "https://arxiv.org/abs/2403.002",
      pdfUrl: "https://arxiv.org/pdf/2403.002",
    },
  ],
  fetchSuccess: true,
  ...overrides,
});

describe("buildArxivPrompt", () => {
  it("includes paper titles and metadata in default locale", () => {
    const result = buildArxivPrompt(makeData(), "2026-03-09");
    expect(result).toContain("ArXiv AI Research Digest");
    expect(result).toContain("Large Language Models as Few-Shot Learners");
    expect(result).toContain("A New Approach to Multi-Agent Planning");
    expect(result).toContain("Alice Smith, Bob Jones, Carol Lee et al.");
    expect(result).toContain("cs.CL, cs.AI, cs.LG");
    expect(result).toContain("2026-03-09");
    expect(result).toContain("2 papers");
    expect(result).toContain("Write the response in Chinese");
  });

  it("generates English variant", () => {
    const result = buildArxivPrompt(makeData(), "2026-03-09", "en-US");
    expect(result).toContain("ArXiv AI Research Digest");
    expect(result).toContain("Alice Smith, Bob Jones, Carol Lee et al.");
    expect(result).toContain("Categories: cs.CL, cs.AI, cs.LG");
    expect(result).toContain("Authors:");
    expect(result).toContain("Write the response in English");
  });

  it("truncates long abstracts with ellipsis", () => {
    const longSummary = "X".repeat(400);
    const data = makeData({ papers: [{ ...makeData().papers[0]!, summary: longSummary }] });
    const result = buildArxivPrompt(data, "2026-03-09");
    expect(result).toContain(`${"X".repeat(300)}...`);
  });

  it("handles single-paper data", () => {
    const data = makeData({ papers: [makeData().papers[0]!] });
    const result = buildArxivPrompt(data, "2026-03-09");
    expect(result).toContain("1 paper");
  });
});
