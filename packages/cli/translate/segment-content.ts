export interface Segment {
  text: string;
  isCode: boolean;
}

export const segmentContent = (content: string): Segment[] => {
  const result: Segment[] = [];
  let current = "";
  let inCode = false;

  for (const line of content.split(/(?<=\n)/g)) {
    const isfence = line.trimStart().startsWith("```");

    if (isfence) {
      if (inCode) {
        current += line;
        result.push({ text: current, isCode: true });
        current = "";
        inCode = false;
      } else {
        if (current) {
          result.push({ text: current, isCode: false });
          current = "";
        }
        current = line;
        inCode = true;
      }
    } else {
      current += line;
    }
  }

  if (current.trim()) {
    result.push({ text: current, isCode: inCode });
  }

  return result;
};
