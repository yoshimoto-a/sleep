/**直近のレコードを探す*/
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
export type Action = "寝かしつけ開始" | "寝た" | "起きた";
export interface FindLatestResponse {
  record: SleepingSituation;
  action: Action;
}

export const findLatest = (
  completedRecords: SleepingSituation[], //当日で完成したデータ
  containNullRecords: SleepingSituation[], //当日のみで未完成のデータ※存在したら必ず最新になる
  yesterdayRecord: SleepingSituation[], //前日以前最後に起床した
  containYesterdayRecord: SleepingSituation[] //前日と当日を必ず含む
): FindLatestResponse | undefined => {
  const firstLatestOnlybedTime =
    containNullRecords.length === 1 &&
    !containNullRecords[containNullRecords.length - 1].sleep; //!sleep&&!wakeup→寝かしつけ開始が最新
  const firstLatestWakeupOnlyNull =
    containNullRecords.length === 1 &&
    containNullRecords[containNullRecords.length - 1].sleep &&
    !containNullRecords[containNullRecords.length - 1].wakeup; //sleep&&!wakeup→寝たのが最新
  const secondLatest =
    containNullRecords.length === 0 && completedRecords.length >= 1; //起きたのが最新
  const thirdLatestOnlybedTime =
    containNullRecords.length === 0 &&
    completedRecords.length === 0 &&
    containYesterdayRecord.length === 1 &&
    !containYesterdayRecord[containYesterdayRecord.length - 1].sleep; //寝かしつけ開始が最新
  const thirdLatestWakeupOnlyNull =
    containNullRecords.length === 0 &&
    completedRecords.length === 0 &&
    containYesterdayRecord.length === 1 &&
    containYesterdayRecord[containYesterdayRecord.length - 1].sleep;
  !containYesterdayRecord[containYesterdayRecord.length - 1].wakeup; //寝かしつけ開始が最新
  const fourthLatest =
    containNullRecords.length === 0 &&
    completedRecords.length === 0 &&
    containYesterdayRecord.length === 0 &&
    yesterdayRecord.length === 1; //起きたのが最新

  if (firstLatestOnlybedTime) {
    return {
      record: containNullRecords[containNullRecords.length - 1],
      action: "寝かしつけ開始",
    };
  }
  if (firstLatestWakeupOnlyNull) {
    return {
      record: containNullRecords[containNullRecords.length - 1],
      action: "寝た",
    };
  }
  if (secondLatest) {
    return {
      record: completedRecords[completedRecords.length - 1],
      action: "起きた",
    };
  }
  if (thirdLatestOnlybedTime) {
    return {
      record: containYesterdayRecord[containYesterdayRecord.length - 1],
      action: "寝かしつけ開始",
    };
  }
  if (thirdLatestWakeupOnlyNull) {
    return {
      record: containYesterdayRecord[containYesterdayRecord.length - 1],
      action: "寝た",
    };
  }
  if (fourthLatest) {
    return {
      record: yesterdayRecord[yesterdayRecord.length - 1],
      action: "起きた",
    };
  }
};
