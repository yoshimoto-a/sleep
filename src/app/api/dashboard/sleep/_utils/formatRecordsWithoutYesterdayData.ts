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
  startTime: Date | null,
  endTime: Date | null,
  changer: number
) => {
  return {
    id,
    datetime,
    HourAndMinutes: dayjs.tz(datetime, "Asia/Tokyo").format("HH時mm分"),
    action: action,
    MinutesOnly:
      startTime && endTime
        ? FormatDuration(startTime, endTime, "HourAndMinutes")
        : "-",
    changer,
  };
};
export const formatRecordsWithoutYesterdayData = (
  targetDate: Date,
  mappedCompletedRecords: CompletedData[],
  mappedContainNullRecords: ContainNull[],
  containTomorrowRecord: ContainNull[],
  containTodayRecords: CompletedData[]
) => {
  const formatedRecords: FormatedData[] = [];
  //何も返さないパターン→当日を含むレコードがない場合
  const noRecords =
    mappedCompletedRecords.length === 0 &&
    mappedContainNullRecords.length === 0 &&
    containTomorrowRecord.length === 0 &&
    containTodayRecords.length === 0;

  if (noRecords) return formatedRecords;

  /**完結しているデータなしで、日付跨ぎしたデータがある(API叩いた前日以前のデータになる)  */
  if (
    mappedCompletedRecords.length === 0 &&
    containTomorrowRecord.length === 1
  ) {
    const { id, bedTime, sleep, changeUser } = containTomorrowRecord[0];
    if (bedTime) {
      formatedRecords.push(
        createNewData(id, bedTime, "寝かしつけ開始", null, null, changeUser)
      );
    }
    if (!bedTime && sleep) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", null, null, changeUser)
      );
    }
    if (bedTime && sleep && IsToday(sleep, targetDate)) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
      );
    }
    return formatedRecords;
  }

  /*1件目のデータ登録後で未完成の当日データしかない差分出せない*/
  if (
    mappedContainNullRecords.length === 1 &&
    mappedCompletedRecords.length === 0 &&
    containTomorrowRecord.length === 0
  ) {
    const { id, bedTime, sleep, changeUser } = mappedContainNullRecords[0];
    if (bedTime) {
      formatedRecords.push(
        createNewData(id, bedTime, "寝かしつけ開始", null, null, changeUser)
      );
    }
    if (!bedTime && sleep) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", null, null, changeUser)
      );
    }
    if (bedTime && sleep) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
      );
    }
  }

  //①当日のみで完結しているデータしかない
  if (
    mappedCompletedRecords.length !== 0 &&
    mappedContainNullRecords.length === 0
  ) {
    mappedCompletedRecords.map((record, index, records) => {
      const { id, bedTime, sleep, wakeup, changeUser } = record;
      if (index === 0 && bedTime) {
        formatedRecords.push(
          createNewData(id, bedTime, "寝かしつけ開始", null, null, changeUser),
          createNewData(id, sleep, "寝た", bedTime, sleep, changeUser),
          createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
        );
      }
      if (index === 0 && !bedTime) {
        formatedRecords.push(
          createNewData(id, sleep, "寝た", null, null, changeUser),
          createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
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
          createNewData(id, sleep, "寝た", bedTime, sleep, changeUser),
          createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
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
          ),
          createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
        );
      }
    });
  }
  //未完成データと完成データが両方ある
  if (
    mappedCompletedRecords.length !== 0 &&
    mappedContainNullRecords.length !== 0
  ) {
    //完成データが先
    mappedCompletedRecords.map((record, index, records) => {
      const { id, bedTime, sleep, wakeup, changeUser } = record;
      if (index === 0 && bedTime) {
        formatedRecords.push(
          createNewData(id, bedTime, "寝かしつけ開始", null, null, changeUser),
          createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
        );
      }
      if (index === 0 && !bedTime) {
        formatedRecords.push(
          createNewData(id, sleep, "寝た", null, null, changeUser)
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
    //未完成データは直近になるから後で
    //wakeupが完成データの最後のデータの起きた時間になる
    const { wakeup } =
      mappedCompletedRecords[mappedCompletedRecords.length - 1];
    const { id, bedTime, sleep, changeUser } = mappedContainNullRecords[0];
    if (bedTime) {
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
        createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
      );
    }
  }
  //当日のデータ登録し終えて、翌日に跨いでいるデータ
  if (
    mappedContainNullRecords.length === 0 &&
    containTomorrowRecord.length !== 0
  ) {
    //当日の完結したデータがない場合に活動時間の計算がおかしい
    const { wakeup: wakeup } =
      mappedCompletedRecords[mappedCompletedRecords.length - 1];
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
