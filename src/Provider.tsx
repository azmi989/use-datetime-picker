import React, { FC } from "react";
import { DateTimeHookProps } from "./index.types";
import { DateTimePickerContextProvider } from "./DateTimePickerContext";
import { useDateTime } from "./useDateTime";

export const DateTimeProvider: FC<DateTimeHookProps> = ({
  children,
  ...props
}) => {
  const dateTime = useDateTime(props);
  return (
    <DateTimePickerContextProvider {...dateTime}>
      {children}
    </DateTimePickerContextProvider>
  );
};
