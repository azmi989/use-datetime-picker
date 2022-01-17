import { TimeProps } from '..';

export const getTime = (date: Date, format: '12' | '24'): TimeProps => {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    ms: date.getMilliseconds(),
    timeStamp: date.getTime(),
    meridiem:
      format === '24'
        ? undefined
        : date.getHours() < 12 && date.getMinutes() <= 59
        ? 'am'
        : 'pm',
  };
};
