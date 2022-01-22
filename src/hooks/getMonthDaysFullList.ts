import { getNumberOfDays } from "./getNumberOfDays";
import { getMonthDays } from "./getMonthDays";
import { LanguagesType } from "../index.types";

export const getMonthDaysFullList = (date: Date, lang: LanguagesType) => {
  const currentMonthDays = Array.from(
    getMonthDays(date, getNumberOfDays(date), lang)
  );
  const firstDay =
    currentMonthDays[0].dayNumberInWeek - 1
      ? currentMonthDays[0].dayNumberInWeek - 1
      : 0;
  const lastDay = currentMonthDays[getNumberOfDays(date) - 1].dayNumberInWeek
    ? currentMonthDays[getNumberOfDays(date) - 1].dayNumberInWeek
    : 0;
  const prevDate =
    date.getMonth() === 0
      ? new Date(date.getFullYear() - 1, 11, 1)
      : new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const nextDate =
    date.getMonth() === 11
      ? new Date(date.getFullYear() + 1, 0, 1)
      : new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const lastMonthLastNDays =
    firstDay === 0
      ? []
      : Array.from(
          getMonthDays(prevDate, getNumberOfDays(prevDate), lang)
        ).slice(-firstDay);
  const nextMonthFirstNDays =
    lastDay === 0
      ? []
      : Array.from(
          getMonthDays(nextDate, getNumberOfDays(nextDate), lang)
        ).slice(0, 7 - lastDay);

  return lastMonthLastNDays
    .concat(currentMonthDays)
    .concat(nextMonthFirstNDays);
};
