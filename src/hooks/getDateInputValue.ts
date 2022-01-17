export const getDateInputValue = (year: number, month: number, day: number) =>
  `${day ? day : ''}/${month ? month : ''}/${year ? year : '1900'}`;
