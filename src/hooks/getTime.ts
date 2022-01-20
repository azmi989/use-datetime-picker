import { TimeProps, MeridiemType } from "../index.types";

export const getHoursFormat = (hours: number, meridiem?: MeridiemType) => {
  if (meridiem) {
    if (meridiem === "am") {
      if (hours === 12) return 24;
      else return hours;
    } else return hours + 12;
  } else return hours;
};

export const getTime = (date: Date, format: "12" | "24"): TimeProps => ({
  hours: getHoursFormat(
    date.getHours(),
    format === "12" ? (date.getHours() >= 12 ? "pm" : "am") : undefined
  ),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
  ms: date.getMilliseconds(),
  timeStamp: date.getTime(),
  meridiem: date.getHours() >= 12 ? "pm" : "am",
});
