import React, { createContext, ReactNode, useMemo } from "react";
import { DateTimePickerContexProps } from "./index.types";

export const DateTimePickerContext = createContext<DateTimePickerContexProps>({
  dateArg: new Date(),
  dateFormatArg: "YYYY, MMMM DDDD",
  langArg: "default",
  timeFormatArg: "12",
  date: new Date(),
  monthProps: {
    month: "",
    monthNumber: 0,
    monthShort: "",
    nextMonthNumber: 0,
    nextMonthNumberOfDays: 0,
    numberOfDays: 0,
    prevMonthNumber: 0,
    prevMonthNumberOfDays: 0,
  },
  nextYearMaxed: false,
  minYear: 1900,
  maxYear: 0,
  setPickClockArrow: () => {},
  dayProps: {
    date: 0,
    day: "",
    dayNumberInWeek: 0,
    dayShort: "",
    month: 0,
    week: 0,
  },
  inputsProps: {
    date: {
      onBlur: () => {
        return;
      },
      value: "",
      name: "",
      onChange: () => {
        return;
      },
    },
    hours: {
      max: 12,
      min: 0,
      name: "",
      label: "",
      onBlur: () => {
        return;
      },
      onChange: () => {
        return;
      },
      value: 0,
      onFocus: () => {},
    },
    minutes: {
      max: 59,
      min: 0,
      name: "",
      label: "",
      onBlur: () => {
        return;
      },
      onChange: () => {
        return;
      },
      value: 0,
    },
    meridiem: {},
  },
  goToPrevYear: () => {
    return;
  },
  goToPrevMonth: () => {
    return;
  },
  goToNextYear: () => {
    return;
  },
  goToNextMonth: () => {
    return;
  },
  formatedDate: "",
  prevYearMaxed: false,
  setMaxYear: () => {
    return;
  },
  setMinYear: () => {
    return;
  },
  timeProps: {
    minutes: 0,
    hours: 0,
    ms: 0,
    seconds: 0,
    timeStamp: 0,
    meridiem: "am",
  },
  updateDate: () => {
    return;
  },
  weekDays: [],
  yearProps: {
    nextYear: 0,
    prevYear: 0,
    timeStamp: 0,
    year: 0,
    yearMonths: [],
    yearShort: 0,
  },
  yearsList: [],
  monthDays: [],
  selectDay: () => {
    return;
  },
  goToMonth: () => {
    return;
  },
  goToYear: () => {
    return;
  },
  pickClockArrow: "hours",
  // increaseHours: () => {},
  // decreaseHours: () => {},
  // increaseMinutes: () => {},
  // decreaseMinutes: () => {},
  toggleMeridiem: () => {},
});

export const DateTimePickerContextProvider = ({
  children,
  ...values
}: { children?: ReactNode } & DateTimePickerContexProps) => {
  const memoValue = useMemo(() => ({ ...values }), [values]);
  return (
    <DateTimePickerContext.Provider value={memoValue}>
      {children}
    </DateTimePickerContext.Provider>
  );
};
