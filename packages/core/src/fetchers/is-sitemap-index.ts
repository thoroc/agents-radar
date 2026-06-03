export const isSitemapIndex = (xml: string): boolean => {
  return /<sitemapindex[\s>]/.test(xml);
};
