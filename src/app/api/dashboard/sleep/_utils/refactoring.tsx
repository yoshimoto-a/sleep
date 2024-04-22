//一時的にメモ的な使い方するから呼ばれることはない。
import { ContainNull } from "@/app/_types/dashboard/change";
import { CompletedData } from "@/app/_types/dashboard/change";
import { FormatDuration } from "@/app/dashboard/sleep/_utils/formatDuration";
import dayjs from "dayjs";
import { IsToday } from "./isToday";
interface FormatedData {
  HourAndMinutes: string; //時刻
  action: string;
  MinutesOnly: string; //時間
  changer: number;
}
export const FormatRecords = (
  CompletedRecords: CompletedData[],
  ContainNullRecords: ContainNull[],
  containTodayRecords: CompletedData[], //これ要る？？
  yesterdayRecord: CompletedData[],
  containYesterdayRecord: ContainNull[],
  containTomorrowRecord: ContainNull[]
) => {
  const formatedRecords: FormatedData[] = [];
  const createNewData = (
    time: Date,
    action: string,
    startTime: Date,
    endTime: Date,
    changer: number
  ) => {
    return {
      HourAndMinutes: dayjs.tz(time, "Asia/Tokyo").format("HH時mm分"),
      action: action,
      MinutesOnly: FormatDuration(startTime, endTime, "HourAndMinutes"),
      changer,
    };
  };
  if (containYesterdayRecord.length === 1) {
    //２か所処理同じ
    const { bedTime, sleep, wakeup, changeUser } = containYesterdayRecord[0];
    if (bedTime && sleep && !wakeup) {
      formatedRecords.push(
        createNewData(bedTime, "寝た", bedTime, sleep, changeUser)
      );
    } else if (bedTime && sleep && wakeup) {
      if (IsToday(sleep)) {
        formatedRecords.push(
          createNewData(sleep, "寝た", bedTime, sleep, changeUser)
        );
      }
      formatedRecords.push(
        createNewData(wakeup, "起きた", sleep, wakeup, changeUser)
      );
    }
  }

  //条件分岐は全く同じで変数内の値が変わる
  if (ContainNullRecords.length === 1) {
    const { bedTime, sleep, changeUser } = ContainNullRecords[0];
    const { wakeup } = yesterdayRecord[0];
    if (bedTime && !sleep) {
      formatedRecords.push(
        createNewData(bedTime, "寝かしつけ開始", wakeup, bedTime, changeUser)
      );
    } else if (!bedTime && sleep) {
      formatedRecords.push(
        createNewData(sleep, "寝た", wakeup, sleep, changeUser)
      );
    } else if (bedTime && sleep) {
      formatedRecords.push(
        createNewData(bedTime, "寝かしつけ開始", wakeup, bedTime, changeUser)
      );
      formatedRecords.push(
        createNewData(sleep, "寝た", bedTime, sleep, changeUser)
      );
    }
  }
  if (ContainNullRecords.length === 1) {
    const { wakeup } = CompletedRecords[CompletedRecords.length - 1];
    //最新のデータが完結していない状態
    const { bedTime, sleep, changeUser } = ContainNullRecords[0];
    if (bedTime && !sleep) {
      formatedRecords.push(
        createNewData(bedTime, "寝かしつけ開始", wakeup, bedTime, changeUser)
      );
    } else if (!bedTime && sleep) {
      formatedRecords.push(
        createNewData(sleep, "寝た", wakeup, sleep, changeUser)
      );
    } else if (bedTime && sleep) {
      formatedRecords.push(
        createNewData(bedTime, "寝かしつけ開始", wakeup, bedTime, changeUser)
      );
      formatedRecords.push(
        createNewData(sleep, "寝た", bedTime, sleep, changeUser)
      );
    }
  }
  if (CompletedRecords.length !== 0) {
  }
};
