import { LanguagesType } from "..";
import { TimeProps, MeridiemType } from "../index.types";

export const getHoursFormat = (hours: number, meridiem?: MeridiemType) => {
  if (meridiem) {
    if (meridiem === "am") {
      if (hours === 12) return 24;
      else return hours;
    } else return hours + 12;
  } else return hours;
};

export const getTime = (
  date: Date,
  format: "12" | "24",
  lang: LanguagesType
): TimeProps => ({
  hours:
    format === "24"
      ? date.getHours()
      : Number(
          date
            .toLocaleString(lang, { hour12: true, hour: "numeric" })
            .split(" ")[0]
        ),
  minutes: date.getMinutes(),
  seconds: date.getSeconds(),
  ms: date.getMilliseconds(),
  timeStamp: date.getTime(),
  meridiem:
    format === "12"
      ? (date
          .toLocaleString(lang, { hour12: true, hour: "numeric" })
          .split(" ")[1]
          .toLowerCase() as MeridiemType)
      : undefined,
});
