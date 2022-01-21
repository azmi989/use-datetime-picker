import { ChangeEvent, useCallback, useState, FocusEvent } from "react";
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
  onDateInputBlur,
  onDateInputChange,
  onHoursInputBlur,
  onHoursInputChange,
  onHoursInputFocus,
  onMinutesInputBlur,
  onMinutesInputChange,
  onMinutesInputFocus,
  onMeridiemButtonClick,
}: DateTimeHookProps) => {
  const [date, setDate] = useState(dateArg);
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
  const [hoursInputValue, setHoursInputValue] = useState(
    getTime(dateArg, timeFormatArg, langArg).hours
  );
  const [minutesInputValue, setMinutesInputValue] = useState(
    getTime(dateArg, timeFormatArg, langArg).minutes
  );
  const [maxYear, setMaxYear] = useState(dateArg.getFullYear() + 10);
  const [minYear, setMinYear] = useState(dateArg.getFullYear() - 70);
  const [nextYearMaxed, setNextYearMaxed] = useState(false);
  const [prevYearMaxed, setPrevYearMaxed] = useState(false);
  const getMonthDaysArray = useCallback(
    () => Array.from(getMonthDaysFullList(date, langArg)),
    [date, langArg]
  );
  const [weekDays, setWeekDays] = useState(
    getWeekDays(dateArg, Array.from({ length: 7 }), langArg)
  );
  const [yearsList, setYearsList] = useState(getYearsList(maxYear, minYear));
  const updateDate = useCallback(
    (newDateArg: Date) => {
      setDate(newDateArg);
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
      setHoursInputValue(getTime(newDateArg, timeFormatArg, langArg).hours);
      setMinutesInputValue(getTime(newDateArg, timeFormatArg, langArg).minutes);
    },
    [
      dateFormatArg,
      langArg,
      maxYear,
      minYear,
      timeFormatArg,
      weekDays,
      yearProps.nextYear,
      yearProps.prevYear,
    ]
  );
  const goToDay = useCallback(
    (date: Date) => {
      if (date.getDate() > monthProps.numberOfDays) {
        console.error(`${date.getDate()} is not valid for this month`);
        goToDay(new Date(date.setDate(date.getDate() - 1)));
      } else {
        updateDate(date);
      }
    },
    [date]
  );
  const goToYear = useCallback(
    (year: number) => updateDate(new Date(date.setFullYear(year))),
    [date]
  );
  const goToMonth = useCallback(
    (month: number) => updateDate(new Date(date.setMonth(month - 1))),
    [date]
  );
  const goToNextYear = useCallback(() => {
    if (yearProps.year !== maxYear) {
      goToMonth(1);
      goToYear(yearProps.nextYear);
    }
  }, [date]);
  const goToPrevYear = useCallback(() => {
    if (yearProps.year !== minYear) {
      goToMonth(12);
      goToYear(yearProps.prevYear);
    }
  }, [date]);
  const goToNextMonth = useCallback(() => {
    monthProps.monthNumber === 12
      ? goToNextYear()
      : goToMonth(monthProps.nextMonthNumber);
  }, [date]);
  const goToPrevMonth = useCallback(() => {
    monthProps.monthNumber === 1
      ? goToPrevYear()
      : goToMonth(monthProps.prevMonthNumber);
  }, [date]);
  const selectDay = useCallback(
    (day: number) => goToDay(new Date(date.setDate(day))),
    [date]
  );
  const getDateFromInputEvent = (event: string) =>
    event.split("/").map((item) => parseInt(item));
  const handelDateInputChangeHandler = (event: string, update?: boolean) => {
    const [day, month, year] = getDateFromInputEvent(event);
    setDateInputValue(getDateInputValue(new Date(year, month + 1, day)));
    update === true
      ? updateDate(new Date(date.setFullYear(year, month, day)))
      : null;
  };
  const hoursInputChange = (hour: number) => {
    updateDate(new Date(date.setHours(hour)));
  };
  const minutesInputChange = (minute: number) => {
    updateDate(new Date(date.setMinutes(minute)));
  };
  const handelDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handelDateInputChangeHandler(event.target.value);
    onDateInputChange && onDateInputChange(event);
  };

  const handelDateInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    handelDateInputChangeHandler(event.target.value, true);
    onDateInputBlur && onDateInputBlur(event);
  };

  const hoursInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const hour = event.target.value === "" ? 0 : Number(event.target.value);
    hoursInputChange(
      getTime(new Date(date.setHours(hour)), timeFormatArg, langArg).hours
    );
    onHoursInputChange && onHoursInputChange(event);
  };
  const hoursInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    const hour = event.target.value === "" ? 0 : Number(event.target.value);
    hoursInputChange(
      getTime(new Date(date.setHours(hour)), timeFormatArg, langArg).hours
    );
    onHoursInputBlur && onHoursInputBlur(event);
  };
  const minutesInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const minute = event.target.value === "" ? 0 : Number(event.target.value);
    minutesInputChange(minute);
    onMinutesInputChange && onMinutesInputChange(event);
  };
  const minutesInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    const minute = event.target.value === "" ? 0 : Number(event.target.value);
    minutesInputChange(minute);
    onMinutesInputBlur && onMinutesInputBlur(event);
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
      value: hoursInputValue,
      onChange: hoursInputChangeHandler,
      onBlur: hoursInputBlurHandler,
      onFocus: (e) => {
        setPickClockArrow("hours");
        onHoursInputFocus && onHoursInputFocus(e);
      },
    },
    minutes: {
      name: "minutesInput",
      label: "Minutes",
      min: 0,
      max: 59,
      value: minutesInputValue,
      onChange: minutesInputChangeHandler,
      onBlur: minutesInputBlurHandler,
      onFocus: (e) => {
        setPickClockArrow("minutes");
        onMinutesInputFocus && onMinutesInputFocus(e);
      },
    },
    date: {
      value: dateInputValue,
      name: "dateInput",
      onChange: handelDateInputChange,
      onBlur: handelDateInputBlur,
    },
    meridiem: {
      onClick: (e) => {
        toggleMeridiem();
        onMeridiemButtonClick && onMeridiemButtonClick(e);
      },
    },
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
    dateArg,
    setPickClockArrow,
    // increaseHours,
    // decreaseHours,
    // increaseMinutes,
    // decreaseMinutes,
    toggleMeridiem,
  };
};
