export const getDateInputValue = (date: Date) =>
  `${date.getDate() ? date.getDate() : ""}/${
    date.getMonth() + 1 ? date.getMonth() + 1 : ""
  }/${date.getFullYear() ? date.getFullYear() : "1900"}`;
