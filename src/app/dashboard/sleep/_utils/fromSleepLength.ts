/**直近の睡眠時間で調整する時間(分)を返す */
import dayjs from "dayjs";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";
import { SleepingSituationComp } from "@/app/_types/apiRequests/dashboard/sleep";
type AgeRanges =
  | "isAge0to5Months"
  | "isAge6and7Months"
  | "isAge8Month"
  | "isAge9to17Month"
  | "isAge18MonthOver";
export const fromSleepLength = (
  babyData: IndexResponse | undefined,
  data: SleepingSituationComp
) => {
  let ageCategory: AgeRanges = "isAge0to5Months";
  const sleepLength = dayjs(data.wakeup).diff(dayjs(data.sleep), "minutes");
  if (!babyData || !("data" in babyData)) return 0;

  const monthAge = dayjs().diff(dayjs(babyData.data.birthday), "month");
  const ageRanges = {
    isAge0to5Months: monthAge >= 0 && monthAge <= 5,
    isAge6and7Months: monthAge >= 6 && monthAge <= 7,
    isAge8Month: monthAge == 8,
    isAge9to17Month: monthAge >= 9 && monthAge <= 17,
    isAge18MonthOver: monthAge >= 18,
  };

  for (const [key, value] of Object.entries(ageRanges)) {
    if (value) {
      ageCategory = key as AgeRanges;
      break;
    }
  }

  switch (ageCategory) {
    case "isAge0to5Months":
      return 0;
    case "isAge6and7Months":
      if (sleepLength < 50) {
        return 10;
      }
      break;
    case "isAge8Month":
      if (sleepLength < 55) {
        return 10;
      }
      break;
    case "isAge9to17Month":
      if (sleepLength < 60) {
        return 10;
      }
      break;
    case "isAge18MonthOver":
      if (sleepLength < 60) {
        return 30;
      }
      break;
  }
  return 0;
};
