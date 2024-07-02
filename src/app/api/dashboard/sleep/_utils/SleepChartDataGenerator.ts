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
  private chartData: ChartData;
  private keyName: string[];
  constructor(
    formatedData: FormatedData[],
    latestData: FindLatestResponse | undefined,
    targetDate: Date
  ) {
    this.formatedData = formatedData;
    this.latestData = latestData;
    this.targetDate = targetDate;
    this.chartData = { date: dayjs.tz(this.targetDate).format("YYYY-MM-DD") };
    this.keyName = [];
  }
  private get startOfDay(): dayjs.Dayjs {
    return dayjs(this.targetDate).startOf("day");
  }

  private get endOfDay(): dayjs.Dayjs {
    return dayjs(this.targetDate).endOf("day");
  }

  private get today(): boolean {
    return IsToday(new Date(), this.targetDate);
  }

  private get data(): FormatedData[] {
    return this.formatedData.filter(item => item.action !== "寝かしつけ開始");
  }

  public generateChartData(): { chartData: ChartData; keyName: string[] } {
    const noDate = this.data.length === 0;
    const latestDataActionAwake = this.latestData?.action !== "寝た";
    if (noDate && (latestDataActionAwake || !this.latestData)) {
      return this.handleNoData();
    }
    if (noDate && latestDataActionAwake) {
      return this.handleNoDataAwake();
    }

    return this.handleData();
  }

  /*描画するものなし→24時間起きてるグラフ */
  private handleNoData(): { chartData: ChartData; keyName: string[] } {
    this.chartData["1:活動時間"] = 1440;
    this.keyName.push("1:活動時間");
    return { chartData: this.chartData, keyName: this.keyName };
  }

  /*当日になってから今現在までずっと寝ている→今から起きてるグラフ*/
  private handleNoDataAwake(): { chartData: ChartData; keyName: string[] } {
    let count = 1;
    this.chartData[`${count}:睡眠時間`] = this.getMinutesSinceMidnight();
    this.keyName.push(`${count}:睡眠時間`);
    count++;
    this.chartData[`${count}:活動時間`] = 1440 - this.getMinutesSinceMidnight();
    this.keyName.push(`${count}:活動時間`);
    return { chartData: this.chartData, keyName: this.keyName };
  }

  private handleData(): { chartData: ChartData; keyName: string[] } {
    let count = 1;
    let currentTime = this.getTimeDifference(
      this.startOfDay.toDate(),
      this.data[0].datetime
    );
    if (this.data[0].action === "起きた") {
      this.chartData[`${count}:睡眠時間`] = currentTime;
      this.keyName.push(`${count}:睡眠時間`);
    } else if (this.data[0].action === "寝た") {
      this.chartData[`${count}:活動時間`] = currentTime;
      this.keyName.push(`${count}:活動時間`);
    }
    count++;
    if (this.isSingleDataWithAction("寝た")) {
      return this.handleSingleDataSlept(count);
    }
    if (this.isSingleDataWithAction("起きた")) {
      return this.handleSingleDataAwake(count, currentTime);
    }
    if (this.isDoubleDataWithAction("寝た")) {
      return this.handleDoubleDataSlept(count);
    }
    if (this.isDoubleDataWithAction("起きた")) {
      return this.handleDoubleDataAwake(count);
    }
    return this.handleMultipleData(count, currentTime);
  }
  private handleSingleDataSlept(count: number): {
    chartData: ChartData;
    keyName: string[];
  } {
    this.chartData[`${count}:睡眠時間`] = this.getTimeDifference(
      this.data[0].datetime,
      new Date()
    );
    this.keyName.push(`${count}:睡眠時間`);
    count++;
    this.chartData[`${count}:活動時間`] = this.getTimeDifference(
      new Date(),
      null
    );
    this.keyName.push(`${count}:活動時間`);
    return { chartData: this.chartData, keyName: this.keyName };
  }
  private handleSingleDataAwake(
    count: number,
    currentTime: number
  ): { chartData: ChartData; keyName: string[] } {
    this.chartData[`${count}:活動時間`] = 1440 - currentTime;
    this.keyName.push(`${count}:活動時間`);
    return { chartData: this.chartData, keyName: this.keyName };
  }
  private handleDoubleDataSlept(count: number): {
    chartData: ChartData;
    keyName: string[];
  } {
    this.chartData[`${count}:睡眠時間`] = this.getTimeDifference(
      this.data[0].datetime,
      this.data[1].datetime
    );
    this.keyName.push(`${count}:睡眠時間`);
    count++;
    this.chartData[`${count}:活動時間`] = this.getTimeDifference(
      this.data[1].datetime,
      null
    );
    this.keyName.push(`${count}:活動時間`);
    return { chartData: this.chartData, keyName: this.keyName };
  }

  private handleDoubleDataAwake(count: number): {
    chartData: ChartData;
    keyName: string[];
  } {
    this.chartData[`${count}:活動時間`] = this.getTimeDifference(
      this.data[0].datetime,
      this.data[1].datetime
    );
    this.keyName.push(`${count}:活動時間`);
    count++;
    this.chartData[`${count}:睡眠時間`] = this.getTimeDifference(
      this.data[1].datetime,
      this.today ? null : this.endOfDay.toDate()
    );
    this.keyName.push(`${count}:睡眠時間`);
    count++;
    this.chartData[`${count}:活動時間`] = this.getTimeDifference(
      new Date(),
      this.endOfDay.toDate()
    );
    this.keyName.push(`${count}:活動時間`);
    return { chartData: this.chartData, keyName: this.keyName };
  }
  private handleMultipleData(
    count: number,
    currentTime: number
  ): { chartData: ChartData; keyName: string[] } {
    let total = currentTime;
    let key = "";
    this.data.forEach((item, index) => {
      currentTime = 0;
      if (index === this.data.length - 1 && item.action === "起きた") {
        currentTime = this.getTimeDifference(
          item.datetime,
          this.endOfDay.toDate()
        );
      } else if (index === this.data.length - 1 && item.action === "寝た") {
        currentTime = this.getTimeDifference(
          item.datetime,
          this.today ? null : this.endOfDay.toDate()
        );
      } else {
        currentTime = this.getTimeDifference(
          item.datetime,
          this.data[index + 1].datetime
        );
      }
      if (item.action === "寝た") {
        key = `${count}:睡眠時間`;
        this.chartData[key] = currentTime;
      } else {
        key = `${count}:活動時間`;
        this.chartData[key] = currentTime;
      }
      this.keyName.push(key);
      count++;
      total += currentTime;
    });
    if (this.today && this.data[this.data.length - 1].action === "寝た") {
      this.chartData[`${count}:活動時間`] = 1440 - total;
      this.keyName.push(`${count}:活動時間`);
    }
    return { chartData: this.chartData, keyName: this.keyName };
  }

  private getTimeDifference(startTime: Date, endTime: Date | null): number {
    return endTime
      ? dayjs.tz(endTime).diff(startTime, "minute")
      : dayjs.tz().diff(startTime, "minute");
  }
  private getMinutesSinceMidnight(): number {
    return dayjs.tz().diff(dayjs.tz().startOf("day"), "minute");
  }
  private isSingleDataWithAction(action: string): boolean {
    return this.data.length === 1 && this.data[0].action === action;
  }
  private isDoubleDataWithAction(action: string): boolean {
    return this.data.length === 2 && this.data[0].action === action;
  }
}
