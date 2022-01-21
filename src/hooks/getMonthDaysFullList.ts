import { getNumberOfDays } from "./getNumberOfDays";
import { getMonthDays } from "./getMonthDays";
import { LanguagesType } from "../index.types";

export const getMonthDaysFullList = (date: Date, lang: LanguagesType) => {
  const month = Array.from(getMonthDays(date, getNumberOfDays(date), lang));
  const firstDay =
    month[0].dayNumberInWeek - 1 ? month[0].dayNumberInWeek - 1 : 0;
  const lastDay = month[getNumberOfDays(date) - 1].dayNumberInWeek
    ? month[getNumberOfDays(date) - 1].dayNumberInWeek
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

  return Array.from(
    lastMonthLastNDays
      .concat(Array.from(getMonthDays(date, getNumberOfDays(date), lang)))
      .concat(nextMonthFirstNDays)
  );
};
