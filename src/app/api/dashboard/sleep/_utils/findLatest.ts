/**直近のレコードを探す*/
import { FindLatestResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";

export const findLatest = (
  containNullRecords: SleepingSituation[], //未完成のデータ※存在したら必ず最新になる
  completedRecords: SleepingSituation[] //完成した最後のデータ
): FindLatestResponse | undefined => {
  const sleep = containNullRecords.length === 1 && containNullRecords[0].sleep;
  const bedtime =
    containNullRecords.length === 1 && !containNullRecords[0].sleep;
  const wakeup =
    containNullRecords.length === 0 && completedRecords.length === 1;
  if (sleep) {
    return {
      record: containNullRecords[0],
      action: "寝た",
    };
  }
  if (bedtime) {
    return {
      record: containNullRecords[0],
      action: "寝かしつけ",
    };
  }
  if (wakeup) {
    return {
      record: completedRecords[0],
      action: "起きた",
    };
  }
};
