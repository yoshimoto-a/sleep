import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { FindLatestResponse } from "./findLatest";
import { IsToday } from "./isToday";
import { FormatedData } from "@/app/_types/apiRequests/dashboard/sleep";
import { ChartData } from "@/app/_types/apiRequests/dashboard/sleep";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
const getSleepAwakeStatus = (
  time: string,
  sleep: number,
  awake: number
): { time: string; sleep: number; awake: number } => {
  return { time, sleep, awake };
};
const getTimeDifference = (startTime: Date, endTime: Date | null) => {
  //endTimeがnullの場合は現在時刻まで
  return endTime
    ? dayjs.tz(endTime).diff(startTime, "minute")
    : dayjs.tz().diff(startTime, "minute");
};
const getMinutesSinceMidnight = () => {
  return dayjs.tz().diff(dayjs.tz().startOf("day"), "minute");
};
export const generateChartData = (
  formatedData: FormatedData[],
  latestData: FindLatestResponse | undefined,
  targetDate: Date
) => {
  const startOfDay = dayjs(targetDate).startOf("day");
  const endOfDay = dayjs(targetDate).endOf("day");

  //描画に関係ない「寝かしつけ開始」を除いておく
  const data = formatedData.filter(item => item.action !== "寝かしつけ開始");

  const today = IsToday(new Date(), targetDate);
  const chartData: ChartData[] = [];
  if (data.length === 0 && (latestData?.action !== "寝た" || !latestData)) {
    /*描画するものなし→24時間起きてるグラフ */
    chartData.push(getSleepAwakeStatus("00:00", 0, 1440));
    return chartData;
  }
  if (data.length === 0 && latestData?.action === "寝た") {
    /*当日になってから今現在までずっと寝ている→今から起きてるグラフ*/
    chartData.push(
      getSleepAwakeStatus("00:00", getMinutesSinceMidnight(), 0),
      getSleepAwakeStatus(
        dayjs.tz().format("HH:mm"),
        0,
        1440 - getMinutesSinceMidnight()
      )
    );
    return chartData;
  }
  /*当日*/
  let currentTime = getTimeDifference(startOfDay.toDate(), data[0].datetime);
  let time = "00:00";
  chartData.push({
    time,
    sleep: data[0].action === "起きた" ? currentTime : 0,
    awake: data[0].action === "起きた" ? 0 : currentTime,
  });
  //データが1件で、当日登録されたデータが「寝た」の場合、現在時刻まで寝て、現在時刻以降は終日起きた
  if (data.length === 1 && data[0].action === "寝た") {
    chartData.push(
      getSleepAwakeStatus(
        dayjs.tz(data[0].datetime).format("HH:mm"),
        getTimeDifference(data[0].datetime, new Date()),
        0
      ),
      getSleepAwakeStatus(
        dayjs.tz().format("HH:mm"),
        getTimeDifference(new Date(), null),
        0
      )
    );
    return chartData;
  }
  //データが1件で、当日登録されたデータが「起きた」の場合現在時刻以降は終日起きた
  if (data.length === 1 && data[0].action === "起きた") {
    chartData.push(
      getSleepAwakeStatus(
        dayjs.tz(data[0].datetime).format("HH:mm"),
        getTimeDifference(data[0].datetime, null),
        0
      )
    );
    return chartData;
  }

  //データが2件で1つ目のデータが「寝た」の場合
  if (data.length === 2 && data[0].action === "寝た") {
    chartData.push(
      getSleepAwakeStatus(
        dayjs.tz(data[0].datetime).format("HH:mm"),
        getTimeDifference(data[0].datetime, data[1].datetime),
        0
      ),
      getSleepAwakeStatus(
        dayjs.tz(data[1].datetime).format("HH:mm"),
        0,
        getTimeDifference(data[1].datetime, null)
      )
    );
    return chartData;
  }
  //データが2件で1つ目のデータが「起きた」の場合
  if (data.length === 2 && data[0].action === "起きた") {
    chartData.push(
      getSleepAwakeStatus(
        dayjs.tz(data[0].datetime).format("HH:mm"),
        0,
        getTimeDifference(data[0].datetime, data[1].datetime)
      ),
      getSleepAwakeStatus(
        dayjs.tz(data[1].datetime).format("HH:mm"),
        getTimeDifference(data[1].datetime, today ? null : endOfDay.toDate()),
        0
      ),
      getSleepAwakeStatus(
        dayjs.tz().format("HH:mm"),
        0,
        getTimeDifference(new Date(), null)
      )
    );
    return chartData;
  }

  //データ3件以上*******
  let total = 0;
  total += currentTime;
  data.map((item, index) => {
    currentTime = 0;
    time = "";
    if (index === data.length - 1 && item.action === "起きた") {
      //最後のデータが起きたの場合
      currentTime = getTimeDifference(item.datetime, endOfDay.toDate());
      time = dayjs.tz(item.datetime).format("HH:mm");
    } else if (index === data.length - 1 && item.action === "寝た") {
      //最後のデータが寝たの場合
      currentTime = getTimeDifference(
        item.datetime,
        today ? null : endOfDay.toDate()
      );
      time = dayjs.tz(item.datetime).format("HH:mm");
    } else {
      //最初、最後以外のデータ
      currentTime = getTimeDifference(item.datetime, data[index + 1].datetime);
      time = dayjs.tz(item.datetime).format("HH:mm");
    }
    chartData.push({
      time,
      sleep: item.action === "寝た" ? currentTime : 0,
      awake: item.action === "寝た" ? 0 : currentTime,
    });
    total += currentTime;
  });

  //対象の日が当日かつ、最後の登録が「寝た」の場合、現在時刻から起きているとする
  if (today && data[data.length - 1].action === "寝た") {
    chartData.push({
      time: dayjs.tz().format("HH:mm"),
      sleep: 0,
      awake: 1440 - total,
    });
  }

  return chartData;
};
