import { dayjs } from "../../../../utils/dayjs";

type Style = "HourAndMinutes" | "MinutesOnly";

export const FormatDuration = (
  start: Date,
  end: Date,
  style: Style
): string => {
  switch (style) {
    case "HourAndMinutes":
      const duration = dayjs(end).diff(dayjs(start));
      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}時間${minutes}分`;
    case "MinutesOnly":
      const durationMinute = dayjs(end).diff(dayjs(start), "minute");
      return `${durationMinute}分`;
    default:
      throw new Error("HourAndMinutes or MinutesOnly");
  }
};
