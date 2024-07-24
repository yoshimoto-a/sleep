import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
/**次の就寝時刻を返す */
export interface IndexResponse {
  status: 200;
  data: string;
}

export type Action = "寝かしつけ開始" | "寝た" | "起きた";

export interface FindLatestResponse {
  record: SleepingSituation;
  action: Action;
}
