import { getYearMonths } from './getYearMonths';
import { LanguagesType, YearProps } from '..';

export const getYear = (date: Date, lang: LanguagesType): YearProps => {
  return {
    nextYear: date.getFullYear() + 1,
    prevYear: date.getFullYear() - 1,
    timeStamp: date.getTime(),
    year: date.getFullYear(),
    yearShort: Number(date.toLocaleString(lang, { year: '2-digit' })),
    yearMonths: Array.from(getYearMonths(date, lang)),
  };
};
