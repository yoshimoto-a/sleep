/**発達状況と睡眠時間を元に月齢に応じて活動時間を短縮する時間を返す関数 */
import { Growth } from "@prisma/client";
import { wakeWindowsShortening } from "./wakeWindowsShortening";
type AgeRanges =
  | "isAge0to5Months"
  | "isAge6and7Months"
  | "isAge8Month"
  | "isAge9to17Month"
  | "isAge18MonthOver";
export const shortening = (
  monthAge: number,
  sleepLength: number,
  practicing: Growth[],
  acquisition: Growth[],
  walking: Growth[]
) => {
  //短縮する時間を足していき、最後に活動時間から引く
  let shortening: number = 0;

  const ageRanges = {
    isAge0to5Months: monthAge >= 0 && monthAge <= 5,
    isAge6and7Months: monthAge >= 6 && monthAge <= 7,
    isAge8Month: monthAge == 8,
    isAge9to17Month: monthAge >= 9 && monthAge <= 17,
    isAge18MonthOver: monthAge >= 18,
  };

  //switch文のデフォルト設定回避のため初期値適当に設定
  let ageCategory: AgeRanges = "isAge0to5Months";

  for (const [key, value] of Object.entries(ageRanges)) {
    if (value) {
      ageCategory = key as AgeRanges;
      break;
    }
  }
  switch (ageCategory) {
    //低月齢は別計算
    case "isAge0to5Months":
      break;
    case "isAge6and7Months":
      if (sleepLength < 50) {
        shortening += 10;
      }
      break;
    case "isAge8Month":
      if (sleepLength < 55) {
        shortening += 10;
      }
      break;
    case "isAge9to17Month":
      if (sleepLength < 60) {
        shortening += 10;
      }
      break;
    case "isAge18MonthOver":
      if (sleepLength < 60) {
        shortening += 30;
      }
      break;
  }
  //発達状況を元に短縮時間を計算
  shortening += wakeWindowsShortening(practicing, acquisition, walking);

  return shortening;
};
