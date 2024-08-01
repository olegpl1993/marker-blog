export const decodeHtmlEntities = (str: string): string => {
  return str.replace(/&#(\d+);/g, (_: string, dec: string): string => {
    return String.fromCharCode(parseInt(dec, 10));
  });
};
