export const isALeapYear = (year: number) => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};
