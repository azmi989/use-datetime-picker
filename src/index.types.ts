import {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  MouseEvent,
  ReactNode,
} from "react";
import { useDateTime } from "./useDateTime";

export type LanguagesType =
  | "default"
  | "af"
  | "sq"
  | "ar-SA"
  | "ar-IQ"
  | "ar-EG"
  | "ar-LY"
  | "ar-DZ"
  | "ar-MA"
  | "ar-TN"
  | "ar-OM"
  | "ar-YE"
  | "ar-SY"
  | "ar-JO"
  | "ar-LB"
  | "ar-KW"
  | "ar-AE"
  | "ar-BH"
  | "ar-QA"
  | "eu"
  | "bg"
  | "be"
  | "ca"
  | "zh-TW"
  | "zh-CN"
  | "zh-HK"
  | "zh-SG"
  | "hr"
  | "cs"
  | "da"
  | "nl"
  | "nl-BE"
  | "en"
  | "en-US"
  | "en-EG"
  | "en-AU"
  | "en-GB"
  | "en-CA"
  | "en-NZ"
  | "en-IE"
  | "en-ZA"
  | "en-JM"
  | "en-BZ"
  | "en-TT"
  | "et"
  | "fo"
  | "fa"
  | "fi"
  | "fr"
  | "fr-BE"
  | "fr-CA"
  | "fr-CH"
  | "fr-LU"
  | "gd"
  | "gd-IE"
  | "de"
  | "de-CH"
  | "de-AT"
  | "de-LU"
  | "de-LI"
  | "el"
  | "he"
  | "hi"
  | "hu"
  | "is"
  | "id"
  | "it"
  | "it-CH"
  | "ja"
  | "ko"
  | "lv"
  | "lt"
  | "mk"
  | "mt"
  | "no"
  | "pl"
  | "pt-BR"
  | "pt"
  | "rm"
  | "ro"
  | "ro-MO"
  | "ru"
  | "ru-MI"
  | "sz"
  | "sr"
  | "sk"
  | "sl"
  | "sb"
  | "es"
  | "es-AR"
  | "es-GT"
  | "es-CR"
  | "es-PA"
  | "es-DO"
  | "es-MX"
  | "es-VE"
  | "es-CO"
  | "es-PE"
  | "es-EC"
  | "es-CL"
  | "es-UY"
  | "es-PY"
  | "es-BO"
  | "es-SV"
  | "es-HN"
  | "es-NI"
  | "es-PR"
  | "sx"
  | "sv"
  | "sv-FI"
  | "th"
  | "ts"
  | "tn"
  | "tr"
  | "uk"
  | "ur"
  | "ve"
  | "vi"
  | "xh"
  | "ji"
  | "zu";

type Year = "YYYY" | "YY";
type Week = "WW" | "W";
type Day = "DDDD" | "DDD" | "DD" | "D";
type Month = "MMMM" | "MMM" | "MM" | "M";

export type TimeFormatType = "12" | "24";
export type MeridiemType = "am" | "pm";
export type DateFormatType =
  | "none"
  | `${Year}, ${Month} ${Day}`
  | `${Month} ${Day}, ${Year}`
  | `${Day} ${Month}, ${Year}`
  | `${Year}, ${Week}`
  | `${Week}, ${Year}`;

export type DayProps = {
  date: number;
  day: string;
  dayNumberInWeek: number;
  dayShort: string;
  week: number;
  month: number;
};
export type MonthProps = {
  month: string;
  monthShort: string;
  monthNumber: number;
  numberOfDays: number;
  nextMonthNumberOfDays: number;
  prevMonthNumberOfDays: number;
  nextMonthNumber: number;
  prevMonthNumber: number;
};
export type YearProps = {
  timeStamp: number;
  year: number;
  yearShort: number;
  prevYear: number;
  nextYear: number;
  yearMonths: MonthProps[];
};
export type TimeProps = {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
  timeStamp: number;
  meridiem?: MeridiemType;
};

export type DateTimeHookProps = {
  dateArg: Date;
  dateFormatArg?: DateFormatType;
  timeFormatArg?: TimeFormatType;
  langArg?: LanguagesType;
  onDateInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDateInputBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onHoursInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onMinutesInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onHoursInputBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onHoursInputFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onMinutesInputBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onMinutesInputFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onMeridiemButtonClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

export type DateTimeHookReturnType = ReturnType<typeof useDateTime>;
export type InputPropd = {
  hours: {
    min: number;
    max: number;
    value: number;
  } & Pick<ComponentProps<"input">, "onChange" | "onBlur" | "onFocus">;
  minutes: {
    min: number;
    max: number;
    value: number;
  } & Pick<ComponentProps<"input">, "onChange" | "onBlur" | "onFocus">;
  date: {
    value: string;
  } & Pick<ComponentProps<"input">, "onChange" | "onBlur">;
  meridiem: Pick<ComponentProps<"button">, "onClick">;
};
export type DateTimePickerContexProps = DateTimeHookReturnType &
  DateTimeHookProps;
