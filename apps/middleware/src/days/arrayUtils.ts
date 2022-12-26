export const last = <T>(array: T[]) => array.at(array.length - 1);

export const getRange = (num1: number, num2: number) => {
  const start = num1 > num2 ? num2 : num1;
  const end = num1 < num2 ? num2 : num1;
  return [...new Array(end - start + 1).keys()].map((index) => index + start);
};
