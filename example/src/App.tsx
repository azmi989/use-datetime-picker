import React, { useEffect } from "react";
import { useDateTimePickerContext } from "../../dist";

export const App = () => {
  const {
    goToPrevMonth,
    goToNextMonth,
    inputsProps,
    weekDays,
    getMonthDaysArray,
    monthProps,
    selectDay,
    date,
  } = useDateTimePickerContext();
  const handelGoToPrevMonth = () => goToPrevMonth();
  const handelGoToNextMonth = () => goToNextMonth();
  useEffect(() => {
    console.log(weekDays);
  }, []);
  return (
    <>
      <div className="calendar">
        <div className="calendar-head">
          <div className="calendar-head-nav">
            <button onClick={handelGoToPrevMonth}>{"<"}</button>
            <input {...inputsProps.date} />
            <input {...inputsProps.hours} />
            <input {...inputsProps.minutes} />
            <button onClick={handelGoToNextMonth}>{">"}</button>
          </div>
          <div className="calendar-head-weekdays">
            {weekDays.map((day) => (
              <p>{day}</p>
            ))}
          </div>
        </div>
        <div className="calendar-body">
          {getMonthDaysArray().map((day) => (
            <button
              disabled={day.month !== monthProps.monthNumber}
              onClick={() => selectDay(day.date)}
              style={{
                backgroundColor:
                  date.getDate() === day.date &&
                  date.getMonth() === day.month - 1
                    ? "pink"
                    : "indigo",
              }}
            >
              {day.date}
            </button>
          ))}
        </div>
        <h1>{JSON.stringify(date)}</h1>
      </div>
    </>
  );
};
