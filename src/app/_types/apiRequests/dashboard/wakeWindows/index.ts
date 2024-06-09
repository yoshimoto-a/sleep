import { Type } from "@prisma/client";

/**活動時間*/
export interface WakeWindows {
  id: number;
  babyId: number;
  time: number;
  type: Type;
  createUser: number;
  changeUser: number;
}
/**入眠までの時間*/
export interface SleepPrepTime {
  id: number;
  babyId: number;
  time: number;
  createUser: number;
  changeUser: number;
}

export interface IndexSuccessResponse {
  status: 200;
  data: {
    activityTime: WakeWindows[];
    sleepPrepTime: SleepPrepTime;
  };
}

export interface IndexErrorResponse {
  status: 204 | 400 | 404 | 500;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;
