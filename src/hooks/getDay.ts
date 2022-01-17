import { getWeekNumber } from './getWeekNumber';
import { DayProps, LanguagesType } from '..';

export const getDay = (date: Date, lang: LanguagesType): DayProps => {
  return {
    date: date.getDate(),
    day: date.toLocaleString(lang, { weekday: 'long' }),
    dayNumberInWeek: date.getDay() + 1,
    dayShort: date.toLocaleDateString(lang, { weekday: 'short' }),
    week: getWeekNumber(date),
    month: date.getMonth() + 1,
  };
};
