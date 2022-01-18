import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  FocusEvent,
} from "react";
import { InputPropd } from "./index.types";
import {
  formatAMPM,
  formatDate,
  getDateInputValue,
  getDay,
  getMonth,
  getMonthDays,
  getNumberOfDays,
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
  const [timeProps, setTimeProps] = useState(getTime(dateArg, timeFormatArg));
  const [pickClockArrow, setPickClockArrow] = useState<"hours" | "minutes">(
    "hours"
  );
  const [formatedDate, setFormatedDate] = useState(
    formatDate(dateArg, dateFormatArg, langArg)
  );
  const [dateInputValue, setDateInputValue] = useState(
    getDateInputValue(
      dateArg.getFullYear(),
      dateArg.getMonth() + 1,
      dateArg.getDate()
    )
  );
  const [hoursInputValue, setHoursInputValue] = useState(
    formatAMPM(dateArg).hours
  );
  const [minutesInputValue, setMinutesInputValue] = useState(
    dateArg.getMinutes()
  );
  const [maxYear, setMaxYear] = useState(dateArg.getFullYear() + 10);
  const [minYear, setMinYear] = useState(dateArg.getFullYear() - 70);
  const [nextYearMaxed, setNextYearMaxed] = useState(false);
  const [prevYearMaxed, setPrevYearMaxed] = useState(false);
  const getMonthDaysArray = useCallback(
    () => Array.from(getMonthDays(date, getNumberOfDays(date), langArg)),
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
      setTimeProps(getTime(newDateArg, timeFormatArg));
      setFormatedDate(formatDate(newDateArg, dateFormatArg, langArg));
      setNextYearMaxed(yearProps.nextYear === newDateArg?.getFullYear() + 1);
      setPrevYearMaxed(yearProps.prevYear === newDateArg?.getFullYear() - 1);
      setWeekDays(getWeekDays(newDateArg, weekDays, langArg));
      setYearsList(getYearsList(maxYear, minYear));
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
  const goToMonth = (month: number) => {
    updateDate(new Date(date.setMonth(month - 1)));
  };
  const goToNextYear = () => {
    yearProps.year !== maxYear ? goToYear(yearProps.nextYear) : undefined;
  };
  const goToPrevYear = () => {
    yearProps.year !== minYear ? goToYear(yearProps.prevYear) : undefined;
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

  const handelDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [day, month, year] = getDateFromInputEvent(event.target.value);
    setDateInputValue(getDateInputValue(year, month, day));
    onDateInputChange && onDateInputChange(event);
  };
  const handelDateInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const [day, month, year] = getDateFromInputEvent(event.target.value);
    setDateInputValue(getDateInputValue(year, month, day));
    updateDate(new Date(date.setFullYear(year, month, day)));
    onDateInputBlur && onDateInputBlur(event);
  };
  const hoursInputChange = (hour: number) => {
    setHoursInputValue(hour);
    updateDate(new Date(date.setHours(hour)));
  };
  const minutesInputChange = (minute: number) => {
    setMinutesInputValue(minute);
    updateDate(new Date(date.setMinutes(minute)));
  };
  const hoursInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const hour = event.target.value === "" ? 1 : Number(event.target.value);
    hoursInputChange(hour);
    onHoursInputChange && onHoursInputChange(event);
  };
  const hoursInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    const hour = event.target.value === "" ? 1 : Number(event.target.value);
    hoursInputChange(hour);
    onHoursInputBlur && onHoursInputBlur(event);
  };
  const minutesInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const minute = event.target.value === "" ? 1 : Number(event.target.value);
    minutesInputChange(minute);
    onMinutesInputChange && onMinutesInputChange(event);
  };
  const minutesInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    const minute = event.target.value === "" ? 1 : Number(event.target.value);
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
  useEffect(() => {
    setDateInputValue(
      getDateInputValue(date.getFullYear(), date.getMonth() + 1, date.getDate())
    );
    setMinutesInputValue(date.getMinutes());
    setHoursInputValue(
      timeFormatArg === "12"
        ? date.getHours() > 12
          ? date.getHours() - 12
          : date.getHours()
        : date.getHours()
    );
  }, [date, timeFormatArg]);
  const increaseHours = () => {
    hoursInputChange(timeProps.hours + 1);
  };
  const decreaseHours = () => {
    hoursInputChange(timeProps.hours - 1);
  };
  const increaseMinutes = () => {
    minutesInputChange(timeProps.minutes + 1);
  };
  const decreaseMinutes = () => {
    minutesInputChange(timeProps.minutes - 1);
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
    increaseHours,
    decreaseHours,
    increaseMinutes,
    decreaseMinutes,
    toggleMeridiem,
  };
};
