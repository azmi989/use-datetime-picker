import { isALeapYear } from './isALeapYear';

export const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const getNumberOfDays = (date: Date) => {
  let numberOfDays = monthsSize[date.getMonth()];
  if (date.getMonth() === 1) {
    numberOfDays += isALeapYear(date.getFullYear()) ? 1 : 0;
  }
  return numberOfDays;
};
