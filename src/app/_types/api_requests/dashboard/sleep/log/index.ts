/**睡眠時間→一覧表示*/
interface SleepingSituation {
  id: number;
  babyId: number;
  bedTime: Date;
  sleep: Date;
  wakeup: Date;
}
export interface IndexSuccessResponse {
  status: number;
  data: SleepingSituation;
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;
