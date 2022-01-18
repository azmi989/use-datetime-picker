import React from "react";
import ReactDOM from "react-dom";
import { DateTimeProvider } from "use-datetime-picker";
import { App } from "./App";
import "./index.css";

ReactDOM.render(
  <DateTimeProvider dateArg={new Date(1989, 8, 10, 19, 3)}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DateTimeProvider>,
  document.getElementById("root")
);
