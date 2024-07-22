/**直近のレコードを探す*/
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
export type Action = "寝かしつけ開始" | "寝た" | "起きた";
export interface FindLatestResponse {
  record: SleepingSituation;
  action: Action;
}

export const findLatest = (
  containNullRecords: SleepingSituation[], //未完成のデータ※存在したら必ず最新になる
  completedRecords: SleepingSituation[] //完成した最後のデータ
): FindLatestResponse | undefined => {
  const sleep = containNullRecords.length === 1 && containNullRecords[0].sleep;
  const bedtime =
    containNullRecords.length === 1 && !containNullRecords[0].sleep;
  const wakeup =
    containNullRecords.length === 0 && completedRecords.length === 1;
  let action: Action = "寝た";
  if (sleep) {
    action = "寝た";
  }
  if (bedtime) {
    action = "寝かしつけ開始";
  }
  if (wakeup) {
    action = "起きた";
  }

  return {
    record: completedRecords[0],
    action,
  };
};
