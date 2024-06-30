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

  const today = IsToday(new Date(), targetDate);
  if (data.length === 0 && (latestData?.action !== "寝た" || !latestData)) {
    /*描画するものなし→24時間起きてるグラフ */
    const key = "活動時間";
    chartData[key] = 1440;
    keyName.push(key);
    return { chartData, keyName };
  }
  if (data.length === 0 && latestData?.action === "寝た") {
    /*当日になってから今現在までずっと寝ている→今から起きてるグラフ*/
    let key = `睡眠時間`;
    chartData[key] = getMinutesSinceMidnight();
    keyName.push(key);

    key = `活動時間`;
    chartData[key] = 1440 - getMinutesSinceMidnight();
    keyName.push(key);
    return { chartData, keyName };
  }

  //key名の重複を避けるためにカウントする
  let count = 1;
  let currentTime = getTimeDifference(startOfDay.toDate(), data[0].datetime);
  if (data[0].action === "起きた") {
    const key = `${count}:睡眠時間`;
    chartData[key] = currentTime;
    keyName.push(key);
  } else {
    const key = `${count}:活動時間`;
    chartData[key] = currentTime;
    keyName.push(key);
  }
  count++;
  //データが1件で、当日登録されたデータが「寝た」の場合、現在時刻まで寝て、現在時刻以降は終日起きた
  if (data.length === 1 && data[0].action === "寝た") {
    let key = `${count}:睡眠時間`;
    chartData[key] = getTimeDifference(data[0].datetime, new Date());
    keyName.push(key);
    count++;

    key = `${count}:活動時間`;
    chartData[key] = getTimeDifference(new Date(), null);
    keyName.push(key);
    return { chartData, keyName };
  }
  //データが1件で、当日登録されたデータが「起きた」の場合現在時刻以降は終日起きた
  if (data.length === 1 && data[0].action === "起きた") {
    const key = `${count}:活動時間`;
    chartData[key] = getTimeDifference(data[0].datetime, null);
    keyName.push(key);
    return { chartData, keyName };
  }

  //データが2件で1つ目のデータが「寝た」の場合
  if (data.length === 2 && data[0].action === "寝た") {
    let key = `${count}:睡眠時間`;
    chartData[key] = getTimeDifference(data[0].datetime, data[1].datetime);
    keyName.push(key);
    count++;

    key = `${count}:活動時間`;
    chartData[key] = getTimeDifference(data[1].datetime, null);
    keyName.push(key);
    return { chartData, keyName };
  }
  //データが2件で1つ目のデータが「起きた」の場合
  if (data.length === 2 && data[0].action === "起きた") {
    let key = `${count}:活動時間`;
    chartData[key] = getTimeDifference(data[0].datetime, data[1].datetime);
    keyName.push(key);
    count++;

    key = `${count}:睡眠時間`;
    chartData[key] = getTimeDifference(
      data[1].datetime,
      today ? null : endOfDay.toDate()
    );
    keyName.push(key);
    count++;

    key = `${count}:活動時間`;
    chartData[key] = getTimeDifference(new Date(), null);
    keyName.push(key);

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
    key = `${count}:活動時間`;
    chartData[key] = 1440 - total;
    keyName.push(key);
  }
  return { chartData, keyName };
};
