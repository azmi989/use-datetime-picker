import { ChangeEvent, useState, FocusEvent } from "react";
import { InputPropd } from "./index.types";
import {
  formatDate,
  getDateInputValue,
  getDay,
  getMonth,
  getMonthDaysFullList,
  getTime,
  getWeekDays,
  getYear,
  getYearsList,
} from "./hooks";
import { DateTimeHookProps } from "./index.types";

export const useDateTime = ({
  dateArg,
  dateFormatArg = "YYYY, MMMM DDDD",
  langArg = "default",
  timeFormatArg = "12",
}: DateTimeHookProps) => {
  const date = dateArg;
  const [dayProps, setDayProps] = useState(getDay(dateArg, langArg));
  const [monthProps, setMonthProps] = useState(getMonth(dateArg, langArg));
  const [yearProps, setYearProps] = useState(getYear(dateArg, langArg));
  const [timeProps, setTimeProps] = useState(
    getTime(dateArg, timeFormatArg, langArg)
  );
  const [pickClockArrow, setPickClockArrow] = useState<"hours" | "minutes">(
    "hours"
  );
  const [formatedDate, setFormatedDate] = useState(
    formatDate(dateArg, dateFormatArg, langArg)
  );
  const [dateInputValue, setDateInputValue] = useState(
    getDateInputValue(dateArg)
  );
  const [maxYear, setMaxYear] = useState(dateArg.getFullYear() + 10);
  const [minYear, setMinYear] = useState(dateArg.getFullYear() - 70);
  const [nextYearMaxed, setNextYearMaxed] = useState(false);
  const [prevYearMaxed, setPrevYearMaxed] = useState(false);
  const getMonthDaysArray = () =>
    Array.from(getMonthDaysFullList(date, langArg));
  const [weekDays, setWeekDays] = useState(
    getWeekDays(dateArg, Array.from({ length: 7 }), langArg)
  );
  const [yearsList, setYearsList] = useState(getYearsList(maxYear, minYear));
  const updateDate = (newDateArg: Date) => {
    setDayProps(getDay(newDateArg, langArg));
    setMonthProps(getMonth(newDateArg, langArg));
    setYearProps(getYear(newDateArg, langArg));
    setTimeProps(getTime(newDateArg, timeFormatArg, langArg));
    setFormatedDate(formatDate(newDateArg, dateFormatArg, langArg));
    setNextYearMaxed(yearProps.nextYear === newDateArg?.getFullYear() + 1);
    setPrevYearMaxed(yearProps.prevYear === newDateArg?.getFullYear() - 1);
    setWeekDays(getWeekDays(newDateArg, weekDays, langArg));
    setYearsList(getYearsList(maxYear, minYear));
    setDateInputValue(getDateInputValue(newDateArg));
  };
  const goToDay = (date: Date) => {
    if (date.getDate() > monthProps.numberOfDays) {
      console.error(`${date.getDate()} is not valid for this month`);
      goToDay(new Date(date.setDate(date.getDate() - 1)));
    } else {
      updateDate(date);
    }
  };
  const goToYear = (year: number) =>
    updateDate(new Date(date.setFullYear(year)));
  const goToMonth = (month: number) =>
    updateDate(new Date(date.setMonth(month - 1)));
  const goToNextYear = () => {
    if (yearProps.year !== maxYear) {
      goToMonth(1);
      goToYear(yearProps.nextYear);
    }
  };
  const goToPrevYear = () => {
    if (yearProps.year !== minYear) {
      goToMonth(12);
      goToYear(yearProps.prevYear);
    }
  };
  const goToNextMonth = () => {
    monthProps.monthNumber === 12
      ? goToNextYear()
      : goToMonth(monthProps.nextMonthNumber);
  };
  const goToPrevMonth = () => {
    monthProps.monthNumber === 1
      ? goToPrevYear()
      : goToMonth(monthProps.prevMonthNumber);
  };
  const selectDay = (day: number) => goToDay(new Date(date.setDate(day)));
  const getDateFromInputEvent = (event: string) =>
    event.split("/").map((item) => parseInt(item));
  const handelDateInputChangeHandler = (event: string, update?: boolean) => {
    const [day, month, year] = getDateFromInputEvent(event);
    setDateInputValue(getDateInputValue(new Date(year, month + 1, day)));
    update ? updateDate(new Date(date.setFullYear(year, month, day))) : null;
  };
  const handelDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handelDateInputChangeHandler(event.target.value);
  };

  const handelDateInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    handelDateInputChangeHandler(event.target.value, true);
  };

  const hoursInputHandler = (
    event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    setPickClockArrow("hours");
    const hour = event.target.value === "" ? 0 : Number(event.target.value);
    const newHour = getTime(
      new Date(date.setHours(hour)),
      timeFormatArg,
      langArg
    ).hours;
    const newDate = new Date(date.setHours(newHour));
    updateDate(newDate);
  };
  const minutesInputHandler = (
    event: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setPickClockArrow("minutes");
    const minute = event.target.value === "" ? 0 : Number(event.target.value);
    updateDate(new Date(date.setMinutes(minute)));
  };
  const toggleMeridiem = () =>
    timeFormatArg === "12"
      ? updateDate(
          new Date(
            date.setHours(
              timeProps.meridiem === "pm"
                ? date.getHours() - 12
                : date.getHours() + 12
            )
          )
        )
      : undefined;

  const inputsProps: InputPropd = {
    hours: {
      name: "hoursInput",
      label: "Hours",
      min: timeFormatArg === "12" ? 1 : 0,
      max: timeFormatArg === "12" ? 12 : 23,
      value: timeProps.hours,
      onChange: hoursInputHandler,
      onBlur: hoursInputHandler,
    },
    minutes: {
      name: "minutesInput",
      label: "Minutes",
      min: 0,
      max: 59,
      value: timeProps.minutes,
      onChange: minutesInputHandler,
      onBlur: minutesInputHandler,
    },
    date: {
      value: dateInputValue,
      name: "dateInput",
      onChange: handelDateInputChange,
      onBlur: handelDateInputBlur,
    },
    meridiem: {
      onClick: () => toggleMeridiem(),
    },
  };

  const increaseHours = () => {
    setPickClockArrow("hours");
    updateDate(new Date(date.setHours(date.getHours() + 1)));
  };
  const decreaseHours = () => {
    setPickClockArrow("hours");
    updateDate(new Date(date.setHours(date.getHours() - 1)));
  };
  const increaseMinutes = () => {
    setPickClockArrow("minutes");
    updateDate(new Date(date.setMinutes(date.getMinutes() + 1)));
  };
  const decreaseMinutes = () => {
    setPickClockArrow("minutes");
    updateDate(new Date(date.setMinutes(date.getMinutes() - 1)));
  };

  return {
    date,
    dayProps,
    monthProps,
    yearProps,
    timeProps,
    formatedDate,
    maxYear,
    setMaxYear,
    minYear,
    setMinYear,
    nextYearMaxed,
    prevYearMaxed,
    weekDays,
    yearsList,
    goToNextMonth,
    goToPrevMonth,
    goToNextYear,
    goToPrevYear,
    inputsProps,
    selectDay,
    getMonthDaysArray,
    updateDate,
    goToYear,
    goToMonth,
    pickClockArrow,
    setPickClockArrow,
    increaseHours,
    decreaseHours,
    increaseMinutes,
    decreaseMinutes,
    toggleMeridiem,
  };
};
