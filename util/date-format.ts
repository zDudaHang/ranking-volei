import { format } from "date-fns";
import { toTitleCase } from "./string-format";

export function asWeekDay(date: Date | string): string {
  const day = typeof date === "string" ? new Date(date) : date;
  const weekDay = day.toLocaleString("pt-BR", { weekday: "long" });
  return toTitleCase(weekDay);
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
