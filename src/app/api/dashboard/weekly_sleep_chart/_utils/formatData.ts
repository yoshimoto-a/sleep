import { dayjs } from "../../../../../utils/dayjs";
import { isToday } from "../../sleep/_utils/isToday";
import { FormatedData } from "@/app/_types/apiRequests/dashboard/sleep";
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
import { FormatDuration } from "@/app/dashboard/sleep/_utils/formatDuration";

const createNewData = (
  id: number,
  datetime: Date,
  action: string,
  startTime: Date | null,
  endTime: Date,
  changer: number
) => {
  return {
    id,
    datetime,
    HourAndMinutes: dayjs.tz(datetime, "Asia/Tokyo").format("HH時mm分"),
    action: action,
    MinutesOnly: startTime
      ? FormatDuration(startTime, endTime, "HourAndMinutes")
      : "-",
    changer,
  };
};

export const formatData = (
  data: SleepingSituation[],
  yesterdayData: SleepingSituation[],
  targetDate: Date
) => {
  const formatedRecords: FormatedData[] = [];
  //表示するデータなし
  if (data.length === 0) {
    return formatedRecords;
  }
  data.forEach((item, index) => {
    const isYesterdayNoData = yesterdayData.length === 0;
    let preWakeup: Date | null = null;
    const { id, bedTime, sleep, wakeup, changeUser } = item;
    //null、当日ではない場合を判別する条件式の定義
    const isBedtimeToday =
      bedTime && (!bedTime || isToday(bedTime, targetDate));
    const isSleepToday = sleep && (!sleep || isToday(sleep, targetDate));
    const isWakeupToday = wakeup && (!wakeup || isToday(wakeup, targetDate));

    if (index === 0 && isYesterdayNoData) {
      //前日以前のデータがない場合(登録1日目)
      preWakeup = null;
    }
    if (index === 0 && !isYesterdayNoData) {
      preWakeup = yesterdayData[0].wakeup as Date;
    }
    if (index !== 0) {
      preWakeup = data[index - 1].wakeup as Date;
    }
    if (isBedtimeToday) {
      formatedRecords.push(
        createNewData(
          id,
          bedTime ?? new Date(),
          "寝かしつけ",
          preWakeup,
          bedTime ?? new Date(),
          changeUser
        )
      );
    }
    if (isSleepToday) {
      formatedRecords.push(
        createNewData(
          id,
          sleep ?? new Date(),
          "寝た",
          bedTime || preWakeup,
          sleep ?? new Date(),
          changeUser
        )
      );
    }
    if (isWakeupToday) {
      formatedRecords.push(
        createNewData(
          id,
          wakeup ?? new Date(),
          "起きた",
          sleep,
          wakeup ?? new Date(),
          changeUser
        )
      );
    }
  });
  return formatedRecords;
};
