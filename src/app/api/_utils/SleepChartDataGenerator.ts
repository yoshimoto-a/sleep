import { dayjs } from "../../../utils/dayjs";
import { isToday } from "../dashboard/sleep/_utils/isToday";
import { FindLatestResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";
import { FormatedData } from "@/app/_types/apiRequests/dashboard/sleep";
import { ChartData } from "@/app/_types/apiRequests/dashboard/sleep";

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
    this.chartData = { date: dayjs.tz(this.targetDate).format("M/D") };
    this.keyName = [];
  }
  private get startOfDay() {
    return dayjs.tz(this.targetDate).startOf("day");
  }

  private get endOfDay() {
    return dayjs.tz(this.targetDate).endOf("day");
  }

  private get today() {
    return isToday(new Date(), dayjs.tz(this.targetDate).toDate());
  }

  private get data() {
    return this.formatedData.filter(item => item.action !== "寝かしつけ");
  }

  public generateChartData() {
    const noDate = this.data.length === 0;
    const oneData = this.data.length === 1;
    const latestDataActionAwake = this.latestData?.action === "起きた";
    const latestDataActionSlept = this.latestData?.action === "寝た";
    let dataActionSlept = false;
    if (oneData) {
      dataActionSlept = this.formatedData[0].action === "寝た";
    }
    const today = isToday(dayjs.tz(this.targetDate).toDate(), new Date());
    //最後起きたOR最後データなし→全部活動時間
    if (noDate && (latestDataActionAwake || !this.latestData)) {
      this.handleNoData();
      return { chartData: this.chartData, keyName: this.keyName };
    }
    //最後寝た→現在時刻まで睡眠時間
    if (noDate && latestDataActionSlept) {
      this.handleNoDataAwake();
      return { chartData: this.chartData, keyName: this.keyName };
    }
    //一件＆当日＆formatdataが寝た→活動時間→睡眠時間→(現在時刻以降活動時間)
    if (oneData && dataActionSlept && today) {
      this.handleNoDataSlept();
      return { chartData: this.chartData, keyName: this.keyName };
    }
    //一件＆当日以外＆formatdataが寝た→活動時間→睡眠時間
    if (oneData && dataActionSlept && !today) {
      this.handleOneDataSleptNotToday();
      return { chartData: this.chartData, keyName: this.keyName };
    }
    return this.handleData();
  }

  /*描画するものなし→24時間起きてるグラフ */
  private handleNoData() {
    this.chartData["1:活動時間"] = 1440;
    this.keyName.push("1:活動時間");
  }

  /*当日になってから今現在までずっと寝ている→今から起きてるグラフ*/
  private handleNoDataAwake() {
    this.chartData[`1:睡眠時間`] = this.getMinutesSinceMidnight();
    this.keyName.push(`1:睡眠時間`);
    this.chartData[`2:活動時間`] = 1440 - this.getMinutesSinceMidnight();
    this.keyName.push(`2:活動時間`);
  }
  /*過去日付で寝た登録のみ→活動時間→終日寝たのみのグラフ*/
  private handleOneDataSleptNotToday() {
    const awakeTime = this.getTimeDifference(
      this.startOfDay.toDate(),
      this.data[0].datetime
    );
    this.chartData[`1:活動時間`] = awakeTime;
    this.keyName.push(`1:活動時間`);
    this.chartData[`2:睡眠時間`] = 1440 - awakeTime;
    this.keyName.push(`2:睡眠時間`);
  }
  /*前日終わり時点で起きていて(または登録し始め)当日になってから初めて寝たグラフ*/
  private handleNoDataSlept() {
    this.chartData[`1:活動時間`] = this.getTimeDifference(
      this.startOfDay.toDate(),
      this.data[0].datetime
    );
    this.keyName.push(`1:活動時間`);
    this.chartData[`2:睡眠時間`] = this.getTimeDifference(
      this.data[0].datetime,
      new Date()
    );
    this.keyName.push(`2:睡眠時間`);
    this.chartData[`3:活動時間`] = 1440 - this.getMinutesSinceMidnight();
    this.keyName.push(`3:活動時間`);
  }

  private handleData() {
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
      this.handleSingleDataSlept(count);
    }
    if (this.isSingleDataWithAction("起きた")) {
      return this.handleSingleDataAwake(count, currentTime);
    }
    if (this.isDoubleDataWithAction("寝た")) {
      return this.handleDoubleDataSlept(count, currentTime);
    }
    if (this.isDoubleDataWithAction("起きた")) {
      return this.handleDoubleDataAwake(count, currentTime);
    }
    return this.handleMultipleData(count, currentTime);
  }
  private handleSingleDataSlept(count: number) {
    this.chartData[`${count}:活動時間`] = this.getTimeDifference(
      this.data[0].datetime,
      new Date()
    );
    this.keyName.push(`${count}:活動時間`);
    count++;
    this.chartData[`${count}:睡眠時間`] = this.getTimeDifference(
      new Date(),
      null
    );
    this.keyName.push(`${count}:睡眠時間`);
  }
  private handleSingleDataAwake(count: number, currentTime: number) {
    this.chartData[`${count}:活動時間`] = 1440 - currentTime;
    this.keyName.push(`${count}:活動時間`);
    return { chartData: this.chartData, keyName: this.keyName };
  }
  private handleDoubleDataSlept(count: number, currentTime: number) {
    let total = currentTime;
    const sleepTime = this.getTimeDifference(
      this.data[0].datetime,
      this.data[1].datetime
    );
    total += sleepTime;
    this.chartData[`${count}:睡眠時間`] = sleepTime;
    this.keyName.push(`${count}:睡眠時間`);
    count++;
    this.chartData[`${count}:活動時間`] = 1440 - total;
    this.keyName.push(`${count}:活動時間`);
    return { chartData: this.chartData, keyName: this.keyName };
  }

  private handleDoubleDataAwake(count: number, currentTime: number) {
    let total = currentTime;

    const calculateTimeDifference = (start: Date, end: Date | null) => {
      return this.getTimeDifference(start, end);
    };

    const addChartData = (key: string, value: number) => {
      this.chartData[key] = value;
      this.keyName.push(key);
      total += value;
    };

    addChartData(
      `${count}:活動時間`,
      calculateTimeDifference(this.data[0].datetime, this.data[1].datetime)
    );
    count++;

    addChartData(
      `${count}:睡眠時間`,
      calculateTimeDifference(
        this.data[1].datetime,
        this.today ? null : this.endOfDay.toDate()
      )
    );

    if (this.today) {
      addChartData(`${count}:活動時間`, 1440 - total);
    }

    return { chartData: this.chartData, keyName: this.keyName };
  }
  private handleMultipleData(count: number, currentTime: number) {
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

  private getTimeDifference(startTime: Date, endTime: Date | null) {
    return endTime
      ? dayjs.tz(endTime).diff(startTime, "minute")
      : dayjs.tz().diff(startTime, "minute");
  }
  private getMinutesSinceMidnight() {
    return dayjs.tz().diff(dayjs.tz().startOf("day"), "minute");
  }
  private isSingleDataWithAction(action: string) {
    return this.data.length === 1 && this.data[0].action === action;
  }
  private isDoubleDataWithAction(action: string) {
    return this.data.length === 2 && this.data[0].action === action;
  }
}
