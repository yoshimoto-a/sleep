import { FindLatestResponse } from "../nextSleepTime";
import { ChartData } from "../sleep";

export interface IndexResponse {
  status: 200;
  message: string;
  chartData: ChartData[];
  keyname: string[];
  totalSleepTimeAverage: string;
  latestData: FindLatestResponse;
}
