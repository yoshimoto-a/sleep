import { ApiRequest } from "../../apiRequest";
/**bedTimeは記録しないことも想定してnullでもOK
 *bedTimeかwakeupかの登録でputするので
 *sleepは必ずデータが入る
 */
interface SleepingSituation {
  babyId: number;
  bedTime: Date | null;
  sleep: Date;
  wakeup: Date | null;
  createUser: number;
}
export interface UpdateRequests extends ApiRequest {
  body: {
    id: number;
    data: SleepingSituation;
  };
}
