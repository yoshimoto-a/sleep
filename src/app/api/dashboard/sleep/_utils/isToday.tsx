//日付が今日ならtrue、今日でないならfalse返す関数
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const IsToday = (date: Date) => {
  const startOfDay = dayjs.tz(new Date(), "Asia/Tokyo").startOf("day");
  const endOfDay = dayjs.tz(new Date(), "Asia/Tokyo").endOf("day");

  return dayjs(date).isBetween(startOfDay, endOfDay);
};
