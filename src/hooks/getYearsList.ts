function* years(maxYear: number, minYear: number): IterableIterator<number> {
  let currentYear = minYear;
  yield currentYear;
  while (currentYear < maxYear) {
    ++currentYear;
    yield currentYear;
  }
}

export const getYearsList = (maxYear: number, minYear: number) =>
  Array.from(years(maxYear, minYear));
