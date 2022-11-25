export const getRandomHeight = (n: number): string => {
  const heights: string[] = ['164px', '118px', '200px', '132px', '178px'];
  let builtHeight = '156px';
  for (let x = 0; x < n; x++) {
    if ((x + 1) % 6 === 0) {
      builtHeight = heights[4];
    } else if ((x + 1) % 5 === 0) {
      builtHeight = heights[2];
    } else if ((x + 1) % 3 === 0) {
      builtHeight = heights[1];
    } else if ((x + 1) % 4 === 0) {
      builtHeight = heights[3];
    } else if ((x + 1) % 2 === 0) {
      builtHeight = heights[0];
    } else {
      builtHeight = heights[2];
    }
  }
  return builtHeight;
};
