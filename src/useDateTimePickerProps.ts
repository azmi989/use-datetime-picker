import { Context, useContext } from "react";
import { DateTimePickerContexProps } from ".";

export const useDateTimePickerProps = (
  context: Context<DateTimePickerContexProps>
) => useContext(context);
