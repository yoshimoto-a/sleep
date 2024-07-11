/**直近のレコードを探す*/
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
export type Action = "寝かしつけ開始" | "寝た" | "起きた";
export interface FindLatestResponse {
  record: SleepingSituation;
  action: Action;
}

export const findLatestData = (
  data: SleepingSituation //最新データ
): FindLatestResponse | undefined => {
  let action: Action;
  if (data.wakeup) {
    action = "起きた";
  } else if (data.sleep) {
    action = "寝た";
  } else {
    action = "寝かしつけ開始";
  }

  return {
    record: data,
    action: action,
  };
};
