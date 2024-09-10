/**直近のレコードを探す*/
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";

export const findLatestData = (
  data: SleepingSituation //最新データ
) => {
  if (data.wakeup) {
    return "起きた";
  } else if (data.sleep) {
    return "寝た";
  } else {
    return "寝かしつけ";
  }
};
