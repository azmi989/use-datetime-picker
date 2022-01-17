import { getNumberOfDays } from './getNumberOfDays';
import { LanguagesType, MonthProps } from '..';

export const getMonth = (date: Date, lang: LanguagesType): MonthProps => {
  const nextMonthNumber = date.getMonth() === 11 ? 0 : date.getMonth() + 1;
  const prevMonthNumber = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
  return {
    month: date.toLocaleString(lang, { month: 'long' }),
    monthNumber: date.getMonth() + 1,
    monthShort: date.toLocaleString(lang, { month: 'short' }),
    numberOfDays: getNumberOfDays(date),
    nextMonthNumberOfDays: getNumberOfDays(
      new Date(date.getFullYear(), nextMonthNumber)
    ),
    prevMonthNumberOfDays: getNumberOfDays(
      new Date(date.getFullYear(), prevMonthNumber)
    ),
    nextMonthNumber: nextMonthNumber + 1,
    prevMonthNumber: prevMonthNumber + 1,
  };
};
