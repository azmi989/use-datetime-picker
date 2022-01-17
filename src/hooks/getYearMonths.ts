import { getMonth } from './getMonth';
import { LanguagesType, MonthProps } from '..';

export function* getYearMonths(
  date: Date,
  lang: LanguagesType
): IterableIterator<MonthProps> {
  let currentMonth = 0;
  yield getMonth(new Date(date.getFullYear(), currentMonth), lang);
  while (currentMonth < 11) {
    ++currentMonth;
    yield getMonth(new Date(date.getFullYear(), currentMonth), lang);
  }
}
