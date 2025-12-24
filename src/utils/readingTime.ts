export const readingTime = (text: string): number => {
  const wordsPerMinute = 50;
  const noOfWords = text.split(/\s+/).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
};
