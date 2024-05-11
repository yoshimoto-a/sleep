import { Type } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

/**活動時間*/
export interface WakeWindows {
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
export interface UpdateRequests extends ApiRequest {
  wakeWindows: WakeWindows[];
  sleepPrepTime: SleepPrepTime;
}
