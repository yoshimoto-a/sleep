import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
import { ActionName } from "@/app/_types/apiRequests/dashboard/sleep";
/**次の就寝時刻を返す */
export interface IndexResponse {
  status: 200;
  data: string;
}

export interface FindLatestResponse {
  record: SleepingSituation;
  action: ActionName;
}
