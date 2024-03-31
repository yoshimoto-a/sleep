import { Type } from "@prisma/client";

/**活動時間*/
export interface ActivityTime {
  id: number;
  babyId: number;
  time: Date;
  type: Type;
  createUser: number;
  changeUser: number;
}
/**入眠までの時間*/
export interface SleepPrepTime {
  id: number;
  babyId: number;
  time: Date;
  createUser: number;
  changeUser: number;
}

export interface IndexSuccessResponse {
  status: number;
  data: {
    activityTime: ActivityTime | ActivityTime[];
    sleepPrepTime: SleepPrepTime;
  };
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;
