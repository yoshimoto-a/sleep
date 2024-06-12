import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { IsToday } from "./isToday";
import { FormatedData } from "@/app/_types/apiRequests/dashboard/sleep";
import { ContainNull } from "@/app/_types/dashboard/change";
import { CompletedData } from "@/app/_types/dashboard/change";
import { FormatDuration } from "@/app/dashboard/sleep/_utils/formatDuration";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const createNewData = (
  id: number,
  datetime: Date,
  action: string,
  startTime: Date,
  endTime: Date,
  changer: number
) => {
  return {
    id,
    datetime,
    HourAndMinutes: dayjs.tz(datetime, "Asia/Tokyo").format("HH時mm分"),
    action: action,
    MinutesOnly: FormatDuration(startTime, endTime, "HourAndMinutes"),
    changer,
  };
};
export const formatRecordsWithYesterdayData = (
  targetDate: Date,
  mappedCompletedRecords: CompletedData[],
  mappedContainNullRecords: ContainNull[],
  containTodayRecords: CompletedData[], //これ要る？？
  yesterdayRecord: CompletedData[],
  containYesterdayRecord: ContainNull[],
  containTomorrowRecord: ContainNull[]
) => {
  const formatedRecords: FormatedData[] = [];
  //何も返さないパターン→当日を含むレコードがない場合
  /**①日付またいで寝ている　OR　寝かしつけ中で当日のデータがまだ存在していない状態 */
  /**②日付が変わる前に起きて、日付が混ざっているデータの登録がないかつ、当日もまだデータがない*/
  const noRecords =
    mappedCompletedRecords.length === 0 &&
    mappedContainNullRecords.length === 0 &&
    containYesterdayRecord.length === 0 &&
    containTomorrowRecord.length === 0 &&
    containTodayRecords.length === 0;

  if (noRecords) return formatedRecords;
  /*②日付またいで起きた(OR)寝た登録がおわったレコードの処理
   */

  if (containYesterdayRecord.length === 1) {
    const { id, bedTime, sleep, wakeup, changeUser } =
      containYesterdayRecord[0];
    if (bedTime && sleep && IsToday(sleep, targetDate) && wakeup) {
      formatedRecords.push(
        createNewData(id, bedTime, "寝た", bedTime, sleep, changeUser),
        createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
      );
    }
    if (bedTime && sleep && IsToday(sleep, targetDate) && !wakeup) {
      formatedRecords.push(
        createNewData(id, bedTime, "寝た", bedTime, sleep, changeUser)
      );
    }
    if (sleep && !IsToday(sleep, targetDate) && wakeup) {
      formatedRecords.push(
        createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
      );
    }
  }

  //①当日のみで完結しているデータがある
  if (mappedCompletedRecords.length > 0 && yesterdayRecord.length !== 0) {
    let yesterdayWakeup: Date;
    if (
      containYesterdayRecord.length === 1 &&
      containYesterdayRecord[0].wakeup
    ) {
      yesterdayWakeup = containYesterdayRecord[0].wakeup;
    } else {
      yesterdayWakeup = yesterdayRecord[0].wakeup;
    }
    mappedCompletedRecords.map((record, index, records) => {
      const { id, bedTime, sleep, wakeup, changeUser } = record;
      if (index === 0 && bedTime) {
        formatedRecords.push(
          createNewData(
            id,
            bedTime,
            "寝かしつけ開始",
            yesterdayWakeup,
            bedTime,
            changeUser
          )
        );
        formatedRecords.push(
          createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
        );
      }
      if (index === 0 && !bedTime) {
        formatedRecords.push(
          createNewData(id, sleep, "寝た", yesterdayWakeup, sleep, changeUser)
        );
      }
      if (index !== 0 && bedTime) {
        formatedRecords.push(
          createNewData(
            id,
            bedTime,
            "寝かしつけ開始",
            records[index - 1].wakeup,
            bedTime,
            changeUser
          )
        );
        formatedRecords.push(
          createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
        );
      }
      if (index !== 0 && !bedTime) {
        formatedRecords.push(
          createNewData(
            id,
            sleep,
            "寝た",
            records[index - 1].wakeup,
            sleep,
            changeUser
          )
        );
      }
      formatedRecords.push(
        createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
      );
    });
  }

  //①当日データ登録したけど未完成(wakeupは必ずnull)かつ日付またいで起きた(OR)寝た登録がおわったレコードがある
  if (
    mappedContainNullRecords.length === 1 &&
    containYesterdayRecord.length === 0
  ) {
    const { id, bedTime, sleep, changeUser } = mappedContainNullRecords[0];
    let wakeup: Date;
    if (mappedCompletedRecords.length >= 1) {
      wakeup = mappedCompletedRecords[mappedCompletedRecords.length - 1].wakeup;
    } else {
      wakeup = yesterdayRecord[0].wakeup;
    }
    if (bedTime && !sleep) {
      formatedRecords.push(
        createNewData(
          id,
          bedTime,
          "寝かしつけ開始",
          wakeup,
          bedTime,
          changeUser
        )
      );
    }
    if (!bedTime && sleep) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", wakeup, sleep, changeUser)
      );
    }
    if (bedTime && sleep) {
      formatedRecords.push(
        createNewData(
          id,
          bedTime,
          "寝かしつけ開始",
          wakeup,
          bedTime,
          changeUser
        )
      );
      formatedRecords.push(
        createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
      );
    }
  }

  //①当日データ登録したけど未完成(wakeupは必ずnull)かつ日付またいで起きた(OR)寝た登録がおわったレコードがない
  if (
    mappedContainNullRecords.length === 1 &&
    containYesterdayRecord.length != 0
  ) {
    const { wakeup: yesterdayWakeup } = containYesterdayRecord[0];
    const { id, bedTime, sleep, changeUser } = mappedContainNullRecords[0];
    let wakeup: Date;
    if (mappedCompletedRecords.length >= 1) {
      wakeup = mappedCompletedRecords[mappedCompletedRecords.length - 1].wakeup;
    } else {
      yesterdayWakeup ? (wakeup = yesterdayWakeup) : (wakeup = new Date());
      //mappedContainNullRecords.length === 1 && containYesterdayRecord.length != 0の式が成り立つとき、elseのケースはあり得ない
    }

    if (bedTime && !sleep) {
      formatedRecords.push(
        createNewData(
          id,
          bedTime,
          "寝かしつけ開始",
          wakeup,
          bedTime,
          changeUser
        )
      );
    }
    if (!bedTime && sleep) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", wakeup, sleep, changeUser)
      );
    }
    if (bedTime && sleep) {
      formatedRecords.push(
        createNewData(
          id,
          bedTime,
          "寝かしつけ開始",
          wakeup,
          bedTime,
          changeUser
        )
      );
      formatedRecords.push(
        createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
      );
    }
  }
  //当日のデータ登録し終えて、翌日に跨いでいるデータ
  if (
    mappedContainNullRecords.length === 0 &&
    containTodayRecords.length !== 0 &&
    yesterdayRecord.length !== 0 &&
    containTomorrowRecord.length !== 0 &&
    containYesterdayRecord.length === 1
  ) {
    //当日の完結したデータがない場合に活動時間の計算がおかしい
    const { wakeup: wakeup } =
      mappedCompletedRecords.length !== 0
        ? mappedCompletedRecords[mappedCompletedRecords.length - 1]
        : containYesterdayRecord[0]; //当日と前日が混ざったレコードにしないといけない

    const { id, bedTime, sleep, changeUser } = containTomorrowRecord[0]; //wakeupは絶対当日ではない
    if (bedTime && wakeup) {
      formatedRecords.push(
        createNewData(
          id,
          bedTime,
          "寝かしつけ開始",
          wakeup,
          bedTime,
          changeUser
        )
      );
    }
    if (bedTime && sleep && IsToday(sleep, targetDate)) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
      );
    }
    if (!bedTime && sleep && IsToday(sleep, targetDate) && wakeup) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", wakeup, sleep, changeUser)
      );
    }
  }

  return formatedRecords;
};
