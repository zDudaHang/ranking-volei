import { format } from "date-fns";
import { toTitleCase } from "./string-format";

export function asWeekDay(date: Date): string {
  const weekDay = date.toLocaleString("pt-BR", { weekday: "long" });
  return toTitleCase(weekDay);
}

const HOUR_MINUTES_PATTERN = "HH:mm";

export function asHourAndMinutes(date: Date): string {
  return format(date, HOUR_MINUTES_PATTERN);
}
