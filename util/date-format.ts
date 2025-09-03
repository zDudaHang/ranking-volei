import { format, formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeFirstLetter } from "./string";

const WEEKDAY_PATTERN = "EEEE";
export function asWeekDay(date: Date | string): string {
  const day = typeof date === "string" ? new Date(date) : date;
  const weekDayLowerCase = format(day, WEEKDAY_PATTERN, { locale: ptBR });
  return capitalizeFirstLetter(weekDayLowerCase);
}

const DAY_PATTERN = "dd/MM/yyyy";
export function asDdMmYyyyWithWeekDay(date: Date | string): string {
  const day = typeof date === "string" ? new Date(date) : date;
  const weekDay = asWeekDay(day);
  return `${format(day, DAY_PATTERN)} (${weekDay})`;
}

const HOUR_MINUTES_PATTERN = "HH:mm";
export function asHourAndMinutes(date: Date | string): string {
  const hour = typeof date === "string" ? new Date(date) : date;
  return format(hour, HOUR_MINUTES_PATTERN);
}
