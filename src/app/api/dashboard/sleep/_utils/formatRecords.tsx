import { FormatDuration } from "@/app/dashboard/sleep/_utils/formatDuration";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ContainNull } from "@/app/_types/dashboard/change";
import { CompletedData } from "@/app/_types/dashboard/change";
import { IsToday } from "./isToday";
import { FormatedData } from "@/app/_types/apiRequests/dashboard/sleep";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const createNewData = (
  id: number,
  time: Date,
  action: string,
  startTime: Date,
  endTime: Date,
  changer: number
) => {
  return {
    id,
    HourAndMinutes: dayjs.tz(time, "Asia/Tokyo").format("HH時mm分"),
    action: action,
    MinutesOnly: FormatDuration(startTime, endTime, "HourAndMinutes"),
    changer,
  };
};
export const FormatRecords = (
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
  if (
    mappedCompletedRecords.length === 0 &&
    mappedContainNullRecords.length === 0 &&
    containYesterdayRecord.length === 0 &&
    containTomorrowRecord.length === 0 &&
    containTodayRecords.length === 0
  )
    return formatedRecords;
  /*②日付またいで起きた(OR)寝た登録がおわったところで、日付の混ざったデータのみ存在している状態
   */
  if (
    containYesterdayRecord.length === 1 &&
    mappedContainNullRecords.length === 0 &&
    mappedCompletedRecords.length === 0
  ) {
    console.log("いち");
    const { id, bedTime, sleep, wakeup, changeUser } =
      containYesterdayRecord[0];
    //絶対複数の登録ある
    if (bedTime && sleep && !wakeup) {
      formatedRecords.push(
        createNewData(id, bedTime, "寝た", bedTime, sleep, changeUser)
      );
    } else if (bedTime && sleep && wakeup) {
      //sleepは当日か前日か判別が必要
      if (IsToday(sleep)) {
        formatedRecords.push(
          createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
        );
      }
      formatedRecords.push(
        createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
      );
    }
    return formatedRecords;
  }
  //①日付が変わる前に起きて、日付が混ざっているデータの登録がないかつ、当日データ登録したけど未完成
  if (
    containYesterdayRecord.length === 0 &&
    mappedContainNullRecords.length === 1 &&
    mappedCompletedRecords.length === 0
  ) {
    console.log("に");
    const { id, bedTime, sleep, changeUser } = mappedContainNullRecords[0];
    const { wakeup } = yesterdayRecord[0];
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
    } else if (!bedTime && sleep) {
      formatedRecords.push(
        createNewData(id, sleep, "寝た", wakeup, sleep, changeUser)
      );
    } else if (bedTime && sleep) {
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

  //①当日のみで完結しているデータがある(日付跨ぎの有無、未完成データの有無対応済)
  if (mappedCompletedRecords.length !== 0 && yesterdayRecord.length === 1) {
    if (containYesterdayRecord.length === 1) {
      console.log("さん");
      //日付跨ぎあり
      const { id, bedTime, sleep, wakeup, changeUser } =
        containYesterdayRecord[0];
      //絶対複数の登録ある
      if (bedTime && sleep && !wakeup) {
        formatedRecords.push(
          createNewData(id, bedTime, "寝た", bedTime, sleep, changeUser)
        );
      } else if (bedTime && sleep && wakeup) {
        //sleepは当日か前日か判別が必要
        if (IsToday(sleep)) {
          formatedRecords.push(
            createNewData(id, sleep, "寝た", bedTime, sleep, changeUser)
          );
        }
        formatedRecords.push(
          createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
        );
      }

      mappedCompletedRecords.map((record, index, records) => {
        if (!containYesterdayRecord[0].wakeup) throw new Error("bad data");
        const { wakeup: yesterdayWakeup } = containYesterdayRecord[0];
        const { id, bedTime, sleep, wakeup, changeUser } = record;
        if (index === 0) {
          if (bedTime) {
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
          } else {
            formatedRecords.push(
              createNewData(
                id,
                sleep,
                "寝た",
                yesterdayWakeup,
                sleep,
                changeUser
              )
            );
          }
        } else {
          if (bedTime) {
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
          } else {
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
        }
      });
    } else if (containYesterdayRecord.length === 0) {
      //日付跨ぎなし
      //当日で未完成データがない状態
      console.log("し");
      const { wakeup: yesterdayWakeup } = yesterdayRecord[0];
      mappedCompletedRecords.map((record, index, records) => {
        const { id, bedTime, sleep, wakeup, changeUser } = record;
        if (index === 0) {
          if (bedTime) {
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
          } else {
            formatedRecords.push(
              createNewData(
                id,
                sleep,
                "寝た",
                yesterdayWakeup,
                sleep,
                changeUser
              )
            );
          }
        } else {
          if (bedTime) {
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
          } else {
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
        }
        formatedRecords.push(
          createNewData(id, wakeup, "起きた", sleep, wakeup, changeUser)
        );
      });
    }
    if (mappedContainNullRecords.length === 1) {
      console.log(mappedContainNullRecords);
      console.log("ご");
      const { wakeup } =
        mappedCompletedRecords[mappedCompletedRecords.length - 1];
      //最新のデータが完結していない状態
      const { id, bedTime, sleep, changeUser } = mappedContainNullRecords[0];
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
      } else if (!bedTime && sleep) {
        formatedRecords.push(
          createNewData(id, sleep, "寝た", wakeup, sleep, changeUser)
        );
      } else if (bedTime && sleep) {
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
  }
  return formatedRecords;
};
