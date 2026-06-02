export const buildSourceHeader = (
  suffix: string,
  dateStr: string,
  utcStr: string,
  title: string,
  sourceLabel: string,
  sourceUrl: string,
  countEn: string,
  countZh: string,
  extraMeta?: string,
): string => {
  const count = suffix ? countEn : countZh;
  const meta = extraMeta ? ` | ${extraMeta}` : "";
  return suffix
    ? `# ${title} ${dateStr}\n\n> Source: [${sourceLabel}](${sourceUrl}) | ${count} | Generated: ${utcStr} UTC${meta}`
    : `# ${title} ${dateStr}\n\n> 数据来源: [${sourceLabel}](${sourceUrl}) | ${count} | 生成时间: ${utcStr} UTC${meta}`;
};
