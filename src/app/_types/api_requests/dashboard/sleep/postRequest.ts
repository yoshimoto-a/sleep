/**POSTする時点ではwakeupは必ずnull
 * bedTimeは記録しないことも想定
 *bedTimeかsleepが登録されるタイミングでPOST
 */
interface SleepingSituation {
  babyId: number;
  bedTime: Date | null;
  sleep: Date | null;
  wakeup: null;
  createUser: number;
}
export interface PostRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    data: SleepingSituation;
  };
}
