import { getDay } from './getDay';
import { LanguagesType } from '..';

export const getWeekDays = (
  dateProp: Date,
  weekDays: string[],
  lang: LanguagesType
) => {
  weekDays.forEach((_, index) => {
    const day = getDay(
      new Date(dateProp.getFullYear(), dateProp.getMonth() - 1, index),
      lang
    );
    weekDays[day.dayNumberInWeek - 1] = day.day;
    if (!weekDays.includes(day.day)) {
      weekDays[day.dayNumberInWeek - 1] = day.day;
    }
  });
  return weekDays;
};
