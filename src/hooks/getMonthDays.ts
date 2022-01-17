import { getDay } from './getDay';
import { LanguagesType, DayProps } from '..';

export function* getMonthDays(
  date: Date,
  numberOfDays: number,
  lang: LanguagesType
): IterableIterator<DayProps> {
  let day = 1;
  yield getDay(new Date(date.getFullYear(), date.getMonth(), day), lang);
  while (day < numberOfDays) {
    ++day;
    yield getDay(new Date(date.getFullYear(), date.getMonth(), day), lang);
  }
}
