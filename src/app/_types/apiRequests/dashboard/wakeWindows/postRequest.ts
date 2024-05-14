import { Type } from "@prisma/client";

/**活動時間*/
export interface PostWakeWindows {
  id?: number;
  babyId: number;
  time: number;
  type: Type;
  createUser: number;
  changeUser: number;
}
/**入眠までの時間*/
export interface SleepPrepTime {
  id?: number;
  babyId: number;
  time: number;
  createUser: number;
  changeUser: number;
}

export interface PostRequests {
  wakeWindows: PostWakeWindows[];
  sleepPrepTime: SleepPrepTime;
}
