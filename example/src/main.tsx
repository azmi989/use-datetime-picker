import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DateTimeProvider } from "use-datetime-picker";
import "./index.css";
import { useDateTimePickerContext } from "use-datetime-picker";
import { useInterval } from "usehooks-ts";

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
    decreaseHours,
    decreaseMinutes,
    increaseHours,
    increaseMinutes,
    timeProps,
    toggleMeridiem,
  } = useDateTimePickerContext();
  // useInterval(() => increaseHours(), 1000);
  // useEffect(() => {
  //   console.log(date);
  // }, [date]);
  return (
    <>
      <div className="calendar">
        <div className="calendar-head">
          <div className="calendar-head-nav">
            <button onClick={goToPrevMonth}>{"<"}</button>
            <input {...inputsProps.date} />
            <div className="numberInput">
              <input type="number" {...inputsProps.hours} />
              <button className="increaseBtn" onClick={increaseHours}>
                +
              </button>
              <button className="decreaseBtn" onClick={decreaseHours}>
                -
              </button>
            </div>
            <div className="numberInput">
              <input type="number" {...inputsProps.minutes} />
              <button className="increaseBtn" onClick={increaseMinutes}>
                +
              </button>
              <button className="decreaseBtn" onClick={decreaseMinutes}>
                -
              </button>
            </div>
            <button onClick={toggleMeridiem}>{timeProps.meridiem}</button>
            <button onClick={goToNextMonth}>{">"}</button>
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

ReactDOM.render(
  <DateTimeProvider dateArg={new Date(1989, 8, 10, 0, 0)} timeFormatArg="12">
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </DateTimeProvider>,
  document.getElementById("root")
);
