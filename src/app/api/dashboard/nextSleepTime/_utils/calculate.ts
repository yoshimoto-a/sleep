import { Growth } from "@prisma/client";
import { WakeWindows } from "@prisma/client";
import { Baby } from "@prisma/client";
import { SleepingSituation } from "@prisma/client";
import dayjs from "dayjs";
import { applyWakeWindows } from "./applyWakeWindows";
import { shortening } from "./shortening";
import { timeZone } from "./timeZone";

export const calculate = (
  practicing: Growth[],
  acquisition: Growth[],
  walking: Growth[],
  wakeWindows: WakeWindows[],
  baby: Baby,
  sleepingSituation: SleepingSituation[]
): string => {
  //起床時刻
  const wakeupTime = dayjs(sleepingSituation[0].wakeup);

  //月齢と修正月齢
  const monthAge = dayjs().diff(dayjs(baby.birthday), "month");
  const correctedMonthAge = dayjs().diff(
    dayjs(baby.expectedDateOfBirth),
    "month"
  );

  //睡眠時間と月齢を元に短縮時間を計算
  const sleepLength = dayjs(sleepingSituation[0].wakeup).diff(
    dayjs(sleepingSituation[0].sleep),
    "minutes"
  );

  //5ヶ月以内は先に算出して返す
  if (correctedMonthAge <= 5 && sleepLength <= 45)
    return wakeupTime.add(sleepLength, "minutes").format("HH時mm分");

  if (correctedMonthAge <= 5 && sleepLength >= 45)
    return wakeupTime.add(45, "minutes").format("HH時mm分");

  //6ヶ月以上
  //そもそも夜間睡眠の時間ならすぐ寝かせたい
  if (timeZone(wakeupTime) === "night") return "即時";

  //活動時間から短縮する時間を計算する
  const shorteningTime =
    monthAge >= 6
      ? shortening(monthAge, sleepLength, practicing, acquisition, walking)
      : 0;

  const addWakeWindows = (val: number) => {
    return wakeupTime.add(val, "minutes");
  };

  //活動時間情報を取りだす
  const { all, morning, noon, evening } = applyWakeWindows(wakeWindows);
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
  console.log("タイムゾーン" + timeZone(noonTime));
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

  console.log(wakeupTime.format("YYYY/MM/DD HH:mm"));
  return "ここまで届かないはず";
};
