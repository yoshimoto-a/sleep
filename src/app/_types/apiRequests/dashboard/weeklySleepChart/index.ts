import { ChartData } from "../sleep";

export interface IndexResponse {
  status: number;
  message: string;
  chartData: ChartData[];
  keyname: string[];
  totalSleepTime: number[];
}
