import React, { FC } from 'react';
import { DateTimeHookProps } from './index.types';
import { DateTimePickerContexProvider } from './DateTimePickerContex';
import { useDateTime } from './useDateTime';

export const DateTimeProvider: FC<DateTimeHookProps> = ({
  children,
  ...props
}) => {
  const dateTime = useDateTime(props);
  return (
    <DateTimePickerContexProvider {...dateTime}>
      {children}
    </DateTimePickerContexProvider>
  );
};
