import { ChartData } from "../sleep";
export interface IndexResponse {
  status: 200;
  data: {
    date: Date;
    chartData: ChartData;
    keyName: string[];
    totalSleepTime: number;
  }[];
}
