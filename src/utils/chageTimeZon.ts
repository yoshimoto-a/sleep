import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const ChangeTimeZone = (time: Date | null) => {
  return time ? dayjs(time).tz().format() : null;
};
