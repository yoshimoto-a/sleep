/**日付跨ぐことを考慮 */
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep/index";
import { FormatDuration } from "@/app/dashboard/sleep/_utils/formatDuration";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
type Records = SleepingSituation[];
//返したい型
interface FormatedData {
  HourAndMinutes: string; //時刻
  action: string;
  MinutesOnly: string; //時間
  changer: number;
}
export const FormatRecords = (
  records: Records,
  startOfDay: Date,
  endOfDay: Date,
  yesterdayRecord: Records
) => {
  const formatedRecords: FormatedData[] = [];
  let newData: FormatedData;
  if (records.length === 0) return formatedRecords;
  if (records.length === 1) {
    const { bedTime, sleep, wakeup, changeUser } = records[0];
    if ((!bedTime && !sleep) || (!sleep && wakeup)) {
      throw new Error("bad data");
    } else if (bedTime && !sleep && !wakeup) {
      //寝かしつけ中、bedtimeは必ず当日で前日のレコード使う
      if (!yesterdayRecord[0].wakeup) throw new Error("bad data");
      newData = {
        HourAndMinutes: dayjs.tz(bedTime, "Asia/Tokyo").format("HH時mm分"),
        action: "寝かしつけ開始",
        MinutesOnly: FormatDuration(
          yesterdayRecord[0].wakeup,
          bedTime,
          "HourAndMinutes"
        ),
        changer: changeUser,
      };
      formatedRecords.push(newData);
    } else if (sleep && !wakeup) {
      //寝てて、sleepは必ず当日の日時
      //bedtimeがnullなら前日のwakeupからの差分
      //bedtimeがnullじゃないなら当日のbedtimeからの差分
      //bedtimeは有無問わず、sleepは当日の日時じゃないと取得されていない
      const start = (bedtime: Date | null) => {
        if (!bedtime) {
          if (!yesterdayRecord[0].wakeup) throw new Error("bad data");
          return yesterdayRecord[0].wakeup;
        } else {
          return bedtime;
        }
      };
      newData = {
        HourAndMinutes: dayjs.tz(sleep, "Asia/Tokyo").format("HH時mm分"),
        action: "寝た",
        MinutesOnly: FormatDuration(start(bedTime), sleep, "HourAndMinutes"),
        changer: changeUser,
      };
      formatedRecords.push(newData);
    } else if (sleep && wakeup) {
      //起きてて、少なくともwakeupは当日の日時だから単純に差分を計算でOK
      newData = {
        HourAndMinutes: dayjs.tz(wakeup, "Asia/Tokyo").format("HH時mm分"),
        action: "起きた",
        MinutesOnly: FormatDuration(sleep, wakeup, "HourAndMinutes"),
        changer: changeUser,
      };
      formatedRecords.push(newData);
    } else {
      throw new Error("bad data");
    }
    return formatedRecords;
  } else if (records.length >= 2) {
    //①sleepかwakeupがnullのレコードを探す(最新のレコードを探す)
    const incompleteRecord = records.find(val => !val.wakeup || !val.sleep);
    let sortedRecord: Records;
    let filteredRecords: Records;
    if (!incompleteRecord) {
      filteredRecords = records;
    } else {
      filteredRecords = records.filter(val => val !== incompleteRecord);
    }

    sortedRecord = filteredRecords.sort((a, b) => {
      if (!a.wakeup) return 1;
      if (!b.wakeup) return -1;
      return a.wakeup > b.wakeup ? 1 : -1;
    });

    const isBetween = require("dayjs/plugin/isBetween");
    dayjs.extend(isBetween);
    const comparison = (datetime: Date | null) =>
      dayjs(datetime).isBetween(startOfDay, endOfDay);

    let HourAndMinutes: string;
    let action: string;
    let MinutesOnly: string;
    let changer: number;
    sortedRecord.map((record, index) => {
      const { bedTime, sleep, wakeup } = record;
      /*一番最初のデータは前日のものが混じるからどれか前日の可能性あるから確認する
  寝かしつけを開始せず(寝始めず)に日付を超えた場合は前日が存在しない
  wakeup以外は前日の可能性もあるからbedtimeとsleepを確認する
  最後のデータはsleepやwaleupもnullの可能性がある*/

      //両方前日　→　wakeupは必ず当日
      if (!comparison(bedTime) && !comparison(sleep)) {
        //sleepの時間から睡眠時間を計算するけどsleepの行は追加しない
        HourAndMinutes = FormatDuration(sleep, wakeup, HourAndMinutes);
        console.log(
          "//sleepの時間から睡眠時間を計算するけどsleepの行は追加せずに" +
            record.id,
          sleep
        );
        //sleepの時間から睡眠時間を計算するけどsleepの行は追加せずに
      }
      //両方当日
      if (comparison(bedTime) && comparison(sleep)) {
        //前日のwakeupが一番新しい時間のデータが必要になって、bedtimeから計算する
        //yesterdayRecordとの差分で活動時間を算出
      }
      //bedtimeだけ前日のパターン
      if (!comparison(bedTime) && comparison(sleep)) {
        console.log(
          "//sleepの行からbedtimeの時間との差分で入眠までの時間を計算" +
            record.id,
          sleep
        );
        //sleepの行からbedtimeの時間との差分で入眠までの時間を計算
      }
      /**一番最後のデータも翌日のを含まないように確認 */
    });
  }
};
