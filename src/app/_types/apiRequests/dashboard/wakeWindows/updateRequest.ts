import { Type } from "@prisma/client";

/**活動時間*/
export interface PutWakeWindows {
  id: number;
  babyId: number;
  time: number;
  type: Type;
  changeUser: number;
}
/**入眠までの時間*/
export interface SleepPrepTime {
  id: number;
  babyId: number;
  time: number;
  changeUser: number;
}
export interface UpdateRequests {
  wakeWindows: PutWakeWindows[];
  sleepPrepTime: SleepPrepTime;
}
