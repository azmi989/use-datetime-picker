import { MeridiemType, TimeProps } from "..";

export const formatAMPM = (date: Date): TimeProps => {
  let hours = date.getHours();
  let minutes = Number(date.getMinutes());
  let ampm: MeridiemType = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? Number(`0${minutes}`) : minutes;
  return {
    hours,
    minutes,
    ms: date.getMilliseconds(),
    seconds: date.getSeconds(),
    timeStamp: date.getTime(),
    meridiem: ampm,
  };
};

export const getTime = (date: Date, format: "12" | "24"): TimeProps =>
  format === "24"
    ? {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        ms: date.getMilliseconds(),
        timeStamp: date.getTime(),
      }
    : formatAMPM(date);
