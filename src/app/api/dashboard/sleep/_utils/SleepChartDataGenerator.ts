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

export class SleepChartDataGenerator {
  private formatedData: FormatedData[];
  private latestData: FindLatestResponse | undefined;
  private targetDate: Date;
  constructor(
    formatedData: FormatedData[],
    latestData: FindLatestResponse | undefined,
    targetDate: Date
  ) {
    this.formatedData = formatedData;
    this.latestData = latestData;
    this.targetDate = targetDate;
  }

  public generateChartData(): { chartData: ChartData; keyName: string[] } {
    const startOfDay = dayjs(this.targetDate).startOf("day");
    const endOfDay = dayjs(this.targetDate).endOf("day");
    const data = this.formatedData.filter(
      item => item.action !== "寝かしつけ開始"
    );
    const chartData: ChartData = {
      date: dayjs.tz(this.targetDate).format("YYYY-MM-DD"),
    };
    const keyName: string[] = [];
    const today = IsToday(new Date(), this.targetDate);
    const noDate = data.length === 0;
    const latestDataActionAwake = this.latestData?.action !== "寝た";
    if (noDate && (latestDataActionAwake || !this.latestData)) {
      return this.handleNoData(chartData, keyName);
    }
    if (noDate && latestDataActionAwake) {
      return this.handleNoDataAwake(chartData, keyName);
    }

    return this.handleData(
      chartData,
      keyName,
      data,
      startOfDay,
      endOfDay,
      today
    );
  }

  /*描画するものなし→24時間起きてるグラフ */
  private handleNoData(
    chartData: ChartData,
    keyName: string[]
  ): { chartData: ChartData; keyName: string[] } {
    chartData["1:活動時間"] = 1440;
    keyName.push("1:活動時間");
    return { chartData, keyName };
  }

  /*当日になってから今現在までずっと寝ている→今から起きてるグラフ*/
  private handleNoDataAwake(
    chartData: ChartData,
    keyName: string[]
  ): { chartData: ChartData; keyName: string[] } {
    let count = 1;
    chartData[`${count}:睡眠時間`] = this.getMinutesSinceMidnight();
    keyName.push(`${count}:睡眠時間`);
    count++;
    chartData[`${count}:活動時間`] = 1440 - this.getMinutesSinceMidnight();
    keyName.push(`${count}:活動時間`);
    return { chartData, keyName };
  }

  private handleData(
    chartData: ChartData,
    keyName: string[],
    data: FormatedData[],
    startOfDay: dayjs.Dayjs,
    endOfDay: dayjs.Dayjs,
    today: boolean
  ): { chartData: ChartData; keyName: string[] } {
    let count = 1;
    let currentTime = this.getTimeDifference(
      startOfDay.toDate(),
      data[0].datetime
    );
    if (data[0].action === "起きた") {
      chartData[`${count}:睡眠時間`] = currentTime;
      keyName.push(`${count}:睡眠時間`);
    } else if (data[0].action === "寝た") {
      chartData[`${count}:活動時間`] = currentTime;
      keyName.push(`${count}:活動時間`);
    }
    count++;
    if (this.isSingleDataWithAction(data, "寝た")) {
      return this.handleSingleDataSlept(chartData, keyName, count, data);
    }
    if (this.isSingleDataWithAction(data, "起きた")) {
      return this.handleSingleDataAwake(chartData, keyName, count, currentTime);
    }
    if (this.isDoubleDataWithAction(data, "寝た")) {
      return this.handleDoubleDataSlept(chartData, keyName, count, data);
    }
    if (this.isDoubleDataWithAction(data, "起きた")) {
      return this.handleDoubleDataAwake(
        chartData,
        keyName,
        count,
        data,
        endOfDay,
        today
      );
    }
    return this.handleMultipleData(
      chartData,
      keyName,
      count,
      data,
      endOfDay,
      today,
      currentTime
    );
  }
  private handleSingleDataSlept(
    chartData: ChartData,
    keyName: string[],
    count: number,
    data: FormatedData[]
  ): { chartData: ChartData; keyName: string[] } {
    chartData[`${count}:睡眠時間`] = this.getTimeDifference(
      data[0].datetime,
      new Date()
    );
    keyName.push(`${count}:睡眠時間`);
    count++;
    chartData[`${count}:活動時間`] = this.getTimeDifference(new Date(), null);
    keyName.push(`${count}:活動時間`);
    return { chartData, keyName };
  }
  private handleSingleDataAwake(
    chartData: ChartData,
    keyName: string[],
    count: number,
    currentTime: number
  ): { chartData: ChartData; keyName: string[] } {
    chartData[`${count}:活動時間`] = 1440 - currentTime;
    keyName.push(`${count}:活動時間`);
    return { chartData, keyName };
  }
  private handleDoubleDataSlept(
    chartData: ChartData,
    keyName: string[],
    count: number,
    data: FormatedData[]
  ): { chartData: ChartData; keyName: string[] } {
    chartData[`${count}:睡眠時間`] = this.getTimeDifference(
      data[0].datetime,
      data[1].datetime
    );
    keyName.push(`${count}:睡眠時間`);
    count++;
    chartData[`${count}:活動時間`] = this.getTimeDifference(
      data[1].datetime,
      null
    );
    keyName.push(`${count}:活動時間`);
    return { chartData, keyName };
  }

  private handleDoubleDataAwake(
    chartData: ChartData,
    keyName: string[],
    count: number,
    data: FormatedData[],
    endOfDay: dayjs.Dayjs,
    today: boolean
  ): { chartData: ChartData; keyName: string[] } {
    chartData[`${count}:活動時間`] = this.getTimeDifference(
      data[0].datetime,
      data[1].datetime
    );
    keyName.push(`${count}:活動時間`);
    count++;
    chartData[`${count}:睡眠時間`] = this.getTimeDifference(
      data[1].datetime,
      today ? null : endOfDay.toDate()
    );
    keyName.push(`${count}:睡眠時間`);
    count++;
    chartData[`${count}:活動時間`] = this.getTimeDifference(
      new Date(),
      endOfDay.toDate()
    );
    keyName.push(`${count}:活動時間`);
    return { chartData, keyName };
  }
  private handleMultipleData(
    chartData: ChartData,
    keyName: string[],
    count: number,
    data: FormatedData[],
    endOfDay: dayjs.Dayjs,
    today: boolean,
    currentTime: number
  ): { chartData: ChartData; keyName: string[] } {
    let total = currentTime;
    let key = "";
    data.forEach((item, index) => {
      currentTime = 0;
      if (index === data.length - 1 && item.action === "起きた") {
        currentTime = this.getTimeDifference(item.datetime, endOfDay.toDate());
      } else if (index === data.length - 1 && item.action === "寝た") {
        currentTime = this.getTimeDifference(
          item.datetime,
          today ? null : endOfDay.toDate()
        );
      } else {
        currentTime = this.getTimeDifference(
          item.datetime,
          data[index + 1].datetime
        );
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
    if (today && data[data.length - 1].action === "寝た") {
      chartData[`${count}:活動時間`] = 1440 - total;
      keyName.push(`${count}:活動時間`);
    }
    return { chartData, keyName };
  }

  private getTimeDifference(startTime: Date, endTime: Date | null): number {
    return endTime
      ? dayjs.tz(endTime).diff(startTime, "minute")
      : dayjs.tz().diff(startTime, "minute");
  }
  private getMinutesSinceMidnight(): number {
    return dayjs.tz().diff(dayjs.tz().startOf("day"), "minute");
  }
  private isSingleDataWithAction(
    data: FormatedData[],
    action: string
  ): boolean {
    return data.length === 1 && data[0].action === action;
  }
  private isDoubleDataWithAction(
    data: FormatedData[],
    action: string
  ): boolean {
    return data.length === 2 && data[0].action === action;
  }
}
