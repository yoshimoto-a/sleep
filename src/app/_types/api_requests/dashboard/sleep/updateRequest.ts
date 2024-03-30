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
export interface updateRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    id: number;
    data: SleepingSituation;
  };
}
