import { Type } from "@prisma/client";

/**活動時間*/
export interface PostWakeWindows {
  id?: number;
  time: number;
  type: Type;
}
/**入眠までの時間*/
export interface SleepPrepTime {
  id?: number;
  time: number;
}

export interface PostRequests {
  wakeWindows: PostWakeWindows[];
  sleepPrepTime: SleepPrepTime;
}
