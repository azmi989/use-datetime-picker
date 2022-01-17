export const addZerosToYear = (number: number) => {
  let str = number.toString();
  let length = str.length;
  const limit = 4;
  const base = '19';
  while (length < limit) {
    if (length < base.length || str === 'NaN') {
      str = `${base}0`;
      length = str.length;
    } else {
      str = `${str}0`;
      length = str.length;
    }
  }
  return Number(str);
};
export const addOnes = (number: number) => {
  let str = number.toString();
  if (str === 'NaN') {
    str = '1';
  }
  return Number(str);
};
