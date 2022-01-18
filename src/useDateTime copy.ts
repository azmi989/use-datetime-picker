import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  FocusEvent,
} from "react";
import { InputPropd } from "./index.types";
import {
  addOnes,
  addZerosToYear,
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
    timeFormatArg === "12"
      ? dateArg.getHours() > 12
        ? dateArg.getHours() - 12
        : dateArg.getHours()
      : dateArg.getHours()
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
      goToDay(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - 1,
          date.getHours(),
          date.getMinutes()
        )
      );
    } else {
      updateDate(date);
    }
  };
  const goToYear = (year: number) => {
    goToDay(
      new Date(
        year,
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );
  };
  const goToMonth = (month: number) => {
    goToDay(
      new Date(
        date.getFullYear(),
        month - 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );
  };
  const goToNextYear = () => {
    if (yearProps.year !== maxYear) {
      goToYear(yearProps.nextYear);
    }
  };
  const goToPrevYear = () => {
    if (yearProps.year !== minYear) {
      goToYear(yearProps.prevYear);
    }
  };
  const goToNextMonth = () => {
    if (monthProps.monthNumber === 12) {
      goToNextYear();
    } else {
      goToMonth(monthProps.nextMonthNumber);
    }
  };
  const goToPrevMonth = () => {
    if (monthProps.monthNumber === 1) {
      goToPrevYear();
    } else {
      goToMonth(monthProps.prevMonthNumber);
    }
  };
  const selectDay = (day: number) =>
    goToDay(
      new Date(
        yearProps.year,
        monthProps.monthNumber - 1,
        day,
        timeFormatArg === "12" && timeProps.hours >= 12
          ? timeProps.hours + 12
          : timeProps.hours,
        timeProps.minutes
      )
    );

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
    updateDate(
      new Date(
        addZerosToYear(year),
        addOnes(month) - 1,
        addOnes(day),
        date.getHours(),
        date.getHours()
      )
    );
    onDateInputBlur && onDateInputBlur(event);
  };
  const hoursInputChange = (hour: number) => {
    setHoursInputValue((prev) =>
      timeFormatArg === "12"
        ? prev > 12 || prev <= 1
          ? prev
          : hour
        : prev > 23 || prev <= 0
        ? prev
        : hour
    );
    updateDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hour,
        date.getMinutes()
      )
    );
  };
  const minutesInputChange = (minute: number) => {
    setMinutesInputValue((prev) =>
      minute <= 59 || minute >= 0 ? minute : prev
    );
    updateDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        minute
      )
    );
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
    updateDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        timeProps.meridiem === "pm"
          ? date.getHours() - 12
          : date.getHours() + 12,
        date.getMinutes()
      )
    );
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
  const increaseHours = () => hoursInputChange((timeProps.hours += 1));
  const decreaseHours = () => hoursInputChange((timeProps.hours -= 1));
  const increaseMinutes = () => hoursInputChange((timeProps.minutes += 1));
  const decreaseMinutes = () => hoursInputChange((timeProps.minutes -= 1));
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
  };
};
