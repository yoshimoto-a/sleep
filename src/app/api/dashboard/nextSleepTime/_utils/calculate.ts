import { Growth } from "@prisma/client";
import { WakeWindows } from "@prisma/client";
import { Baby } from "@prisma/client";
import { SleepingSituation } from "@prisma/client";
import { dayjs } from "../../../../../utils/dayjs";
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
  const wakeupTime = dayjs(sleepingSituation[0].wakeup, "Asia/Tokyo").tz();

  //そもそも夜間睡眠の時間ならすぐ寝かせたい
  if (timeZone(wakeupTime) === "night") return "即時";

  //月齢と修正月齢
  const monthAge = dayjs().tz().diff(dayjs(baby.birthday).tz(), "month");
  const correctedMonthAge = dayjs()
    .tz()
    .diff(dayjs(baby.expectedDateOfBirth).tz(), "month");

  //睡眠時間
  const sleepLength = dayjs(sleepingSituation[0].wakeup)
    .tz()
    .diff(dayjs(sleepingSituation[0].sleep).tz(), "minutes");

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
  if (timeZone(morningTime) === "morning")
    return morningTime.format("HH時mm分");
  if (timeZone(noonTime) === "noon" && noon !== 0)
    return noonTime.format("HH時mm分");
  if (timeZone(eveningTime) === "evening" && evening !== 0)
    return eveningTime.format("HH時mm分");

  //夕寝のつもりが18時過ぎる場合
  if (timeZone(eveningTime) === "night") return eveningTime.format("HH時mm分");

  //早朝起きか6時以降に起きて、活動時間で計算した結果8時より前なら8時を返す
  if (
    (timeZone(wakeupTime) === "wakeupTime" ||
      timeZone(wakeupTime) === "morning") &&
    timeZone(morningTime) === "wakeupTime"
  )
    return "8時00分";

  //夕寝の活動時間がなくて次が18時以降になる場合or昼寝が夕寝の時間になる場合そのまま返す
  if (timeZone(noonTime) === "night" || timeZone(noonTime) === "evening") {
    return noonTime.format("HH時mm分");
  }

  return "ここまで届かないはず";
};
