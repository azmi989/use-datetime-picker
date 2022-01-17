import { getWeekNumber } from './getWeekNumber';
import { DateFormatType, LanguagesType } from '..';

export const formatDate = (
  dateOBJ: Date,
  format: DateFormatType,
  lang: LanguagesType
) => {
  const date = String(dateOBJ.getDate());
  const day = dateOBJ.toLocaleString(lang, { weekday: 'long' });
  const dayShort = dateOBJ.toLocaleDateString(lang, { weekday: 'short' });
  const week = String(getWeekNumber(dateOBJ));
  const month = dateOBJ.toLocaleString(lang, { month: 'long' });
  const monthNumber = String(dateOBJ.getMonth() + 1);
  const monthShort = dateOBJ.toLocaleString(lang, { month: 'short' });
  const year = String(dateOBJ.getFullYear());
  const yearShort = dateOBJ.toLocaleString(lang, { year: '2-digit' });
  return format === 'none'
    ? `${date}, ${month}, ${year}`
    : format
        .replace(/\bYYYY\b/, year)
        .replace(/\bYY\b/, yearShort)
        .replace(/\bWW\b/, week.toString().padStart(2, '0'))
        .replace(/\bW\b/, week)
        .replace(/\bDDDD\b/, day)
        .replace(/\bDDD\b/, dayShort)
        .replace(/\bDD\b/, date.toString().padStart(2, '0'))
        .replace(/\bD\b/, date)
        .replace(/\bMMMM\b/, month)
        .replace(/\bMMM\b/, monthShort)
        .replace(/\bMM\b/, monthNumber.toString().padStart(2, '0'))
        .replace(/\bM\b/, monthNumber);
};
