/**POSTする時点ではwakeupは必ずnull
 * bedTimeは記録しないことも想定
 *bedTimeかsleepが登録されるタイミングでPOST
 */

type Action = "bedTime" | "sleep" | "wakeup";
export interface SleepingSituation {
  bedTime: Date | null;
  sleep: Date | null;
  wakeup: null;
}
export interface PostRequests {
  data: SleepingSituation;
}
