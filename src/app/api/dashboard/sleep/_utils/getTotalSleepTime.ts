import { ChartData as ChartDataType } from "@/app/_types/apiRequests/dashboard/sleep";

export const getTotalSleepTime = (chartData: ChartDataType) => {
  let totalSleepTime = 0;
  for (const key in chartData) {
    //keyには「date」と「活動時間」が含まれるから
    if (!key.includes("睡眠時間")) continue;
    totalSleepTime += chartData[key] as number;
  }
  return totalSleepTime;
};
