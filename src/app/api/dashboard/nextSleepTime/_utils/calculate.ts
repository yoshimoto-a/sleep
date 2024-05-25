import { Growth } from "@prisma/client";
import { WakeWindows } from "@prisma/client";
import { Baby } from "@prisma/client";
import { SleepingSituation } from "@prisma/client";
import dayjs from "dayjs";
import { applyWakeWindows } from "./applyWakeWindows";
import { shortening } from "./shortening";
import { timeZone } from "./timeZone";
import { wakeWindowsShortening } from "./wakeWindowsShortening";

export const calculate = (
  practicing: Growth[],
  acquisition: Growth[],
  walking: Growth[],
  wakeWindows: WakeWindows[],
  baby: Baby,
  sleepingSituation: SleepingSituation[]
) => {
  //起床時刻
  const wakeupTime = dayjs(sleepingSituation[0].wakeup);

  //そもそも夜間睡眠の時間ならすぐ寝かせたい
  if (timeZone(wakeupTime) === "night") return "即時";

  //月齢と修正月齢
  const monthAge = dayjs().diff(dayjs(baby.birthday), "month");
  const correctedMonthAge = dayjs().diff(
    dayjs(baby.expectedDateOfBirth),
    "month"
  );

  //睡眠時間
  const sleepLength = dayjs(sleepingSituation[0].wakeup).diff(
    dayjs(sleepingSituation[0].sleep),
    "minutes"
  );

  //活動時間情報を取りだす
  const { all, morning, noon, evening } = applyWakeWindows(wakeWindows);

  //0.1ヶ月以内は先に算出して返す(昼夜の区別ないから基本の活動時間で算出)
  if (monthAge <= 1 && sleepLength < 40)
    return wakeupTime.add(sleepLength, "minutes").format("HH時mm分");
  if (monthAge <= 1 && sleepLength >= 40) {
    return wakeupTime.add(all, "minutes").format("HH時mm分");
  }

  //2ヶ月は運動面の発達まだ見ない(基本の活動時間で算出)
  if (monthAge === 2 && sleepLength < all)
    return wakeupTime.add(sleepLength, "minutes").format("HH時mm分");
  if (monthAge === 2 && sleepLength >= all)
    return wakeupTime.add(all, "minutes").format("HH時mm分");

  //発達の状況から短縮する時間を算出する
  const wakeWindowsShorteningTime = wakeWindowsShortening(
    practicing,
    acquisition,
    walking
  );

  //3-5ヶ月運動面の発達考慮するけどそれ以外は2ヶ月と同じ
  if (monthAge >= 3 && monthAge <= 5 && sleepLength < all) {
    return wakeupTime
      .add(
        sleepLength - wakeWindowsShorteningTime >= 30
          ? sleepLength - wakeWindowsShorteningTime
          : 30,
        "minutes"
      )
      .format("HH時mm分");
  }
  if (monthAge >= 3 && monthAge <= 5 && sleepLength >= all) {
    return wakeupTime
      .add(all - wakeWindowsShorteningTime, "minutes")
      .format("HH時mm分");
  }

  //活動時間から短縮する時間を計算する
  const shorteningTime =
    monthAge >= 3
      ? shortening(monthAge, sleepLength, practicing, acquisition, walking)
      : 0;

  const addWakeWindows = (val: number) => {
    return wakeupTime.add(val, "minutes");
  };

  //時間帯を問わず活動時間が同じで登録されてるパターン
  if (all != 0 && morning === 0 && noon === 0 && evening === 0) {
    const basicTime = addWakeWindows(all - shorteningTime);
    if (timeZone(basicTime) === "wakeupTime") return "8時00分";
    return basicTime.format("HH時mm分");
  }

  //短縮後の活動時間を各活動時間から差し引いておく(計算後の時間でどの活動時間使うか決めるから)
  const morningTime = addWakeWindows(morning - shorteningTime);
  const noonTime = addWakeWindows(noon - shorteningTime);
  const eveningTime = addWakeWindows(evening - shorteningTime);

  //例えば朝の活動時間で計算して朝が入っていたらその時間を返す
  console.log("タイムゾーン" + timeZone(morningTime));
  if (timeZone(morningTime) === "morning")
    return morningTime.format("HH時mm分");
  if (timeZone(noonTime) === "noon") return noonTime.format("HH時mm分");
  if (timeZone(eveningTime) === "evening")
    return eveningTime.format("HH時mm分");
  if (timeZone(eveningTime) === "night") return eveningTime.format("HH時mm分");

  if (
    timeZone(wakeupTime) === "night" &&
    timeZone(morningTime) === "wakeupTime"
  )
    return "8時00分";

  console.log("起床時刻" + wakeupTime.format("YYYY/MM/DD HH:mm"));
  return "ここまで届かないはず";
};
