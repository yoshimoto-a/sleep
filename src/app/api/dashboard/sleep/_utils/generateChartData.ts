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

  //レスポンスデータに日付セットして初期化する
  const chartData: ChartData = {
    date: dayjs.tz(targetDate).format("YYYY-MM-DD"),
  };
  //順番担保できないから配列にkeyだけ格納しておく
  const keyName: string[] = [];

  //key名の重複を避けるためにカウントする
  let count = 1;
  //key
  const sleep = `${count}:睡眠時間`;
  const awake = `${count}:活動時間`;

  const today = IsToday(new Date(), targetDate);
  if (data.length === 0 && (latestData?.action !== "寝た" || !latestData)) {
    /*描画するものなし→24時間起きてるグラフ */
    chartData[awake] = 1440;
    keyName.push(awake);
    return { chartData, keyName };
  }
  if (data.length === 0 && latestData?.action === "寝た") {
    /*当日になってから今現在までずっと寝ている→今から起きてるグラフ*/
    chartData[sleep] = getMinutesSinceMidnight();
    keyName.push(sleep);

    chartData[awake] = 1440 - getMinutesSinceMidnight();
    keyName.push(awake);
    return { chartData, keyName };
  }

  let currentTime = getTimeDifference(startOfDay.toDate(), data[0].datetime);
  if (data[0].action === "起きた") {
    chartData[sleep] = currentTime;
    keyName.push(sleep);
  } else {
    chartData[awake] = currentTime;
    keyName.push(awake);
  }
  count++;
  //データが1件で、当日登録されたデータが「寝た」の場合、現在時刻まで寝て、現在時刻以降は終日起きた
  if (data.length === 1 && data[0].action === "寝た") {
    chartData[sleep] = getTimeDifference(data[0].datetime, new Date());
    keyName.push(sleep);
    count++;

    chartData[awake] = getTimeDifference(new Date(), null);
    keyName.push(awake);
    return { chartData, keyName };
  }
  //データが1件で、当日登録されたデータが「起きた」の場合現在時刻以降は終日起きた
  if (data.length === 1 && data[0].action === "起きた") {
    chartData[awake] = getTimeDifference(data[0].datetime, null);
    keyName.push(awake);
    return { chartData, keyName };
  }

  //データが2件で1つ目のデータが「寝た」の場合
  if (data.length === 2 && data[0].action === "寝た") {
    chartData[sleep] = getTimeDifference(data[0].datetime, data[1].datetime);
    keyName.push(sleep);
    count++;

    chartData[awake] = getTimeDifference(data[1].datetime, null);
    keyName.push(awake);
    return { chartData, keyName };
  }
  //データが2件で1つ目のデータが「起きた」の場合
  if (data.length === 2 && data[0].action === "起きた") {
    chartData[awake] = getTimeDifference(data[0].datetime, data[1].datetime);
    keyName.push(awake);
    count++;

    chartData[sleep] = getTimeDifference(
      data[1].datetime,
      today ? null : endOfDay.toDate()
    );
    keyName.push(sleep);
    count++;

    chartData[awake] = getTimeDifference(new Date(), null);
    keyName.push(awake);

    return { chartData, keyName };
  }

  //データ3件以上*******
  let total = 0;
  total += currentTime;
  let key = "";
  data.map((item, index) => {
    currentTime = 0;
    if (index === data.length - 1 && item.action === "起きた") {
      //最後のデータが起きたの場合
      currentTime = getTimeDifference(item.datetime, endOfDay.toDate());
    } else if (index === data.length - 1 && item.action === "寝た") {
      //最後のデータが寝たの場合
      currentTime = getTimeDifference(
        item.datetime,
        today ? null : endOfDay.toDate()
      );
    } else {
      //最初、最後以外のデータ
      currentTime = getTimeDifference(item.datetime, data[index + 1].datetime);
    }

    if (item.action === "寝た") {
      key = `${count}:睡眠時間`;
      chartData[key] = currentTime;
    } else {
      key = `${count}:活動時間`;
      chartData[key] = currentTime;
    }
    keyName.push(key);
    count++;
    total += currentTime;
  });

  //対象の日が当日かつ、最後の登録が「寝た」の場合、現在時刻から起きているとする
  if (today && data[data.length - 1].action === "寝た") {
    chartData[awake] = 1440 - total;
    keyName.push(awake);
  }
  return { chartData, keyName };
};
