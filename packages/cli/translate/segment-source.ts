import { hashSegment } from "./hash-segment";
import { segmentContent } from "./segment-content";

export interface SourceSegment {
  text: string;
  isCode: boolean;
  hash: string;
}

export const segmentSource = (content: string): SourceSegment[] => {
  const rawSegments = segmentContent(content.replace(/\r\n/g, "\n"));
  const result: SourceSegment[] = [];

  for (const segment of rawSegments) {
    if (segment.isCode) {
      result.push({ text: segment.text, isCode: true, hash: hashSegment(segment.text) });
      continue;
    }

    let current = "";
    for (const line of segment.text.split(/(?<=\n)/g)) {
      if (line === "\n") {
        if (current) {
          result.push({ text: current, isCode: false, hash: hashSegment(current) });
          current = "";
        }
        result.push({ text: "\n", isCode: false, hash: "" });
      } else {
        current += line;
      }
    }
    if (current) {
      result.push({ text: current, isCode: false, hash: hashSegment(current) });
    }
  }

  return result;
};
