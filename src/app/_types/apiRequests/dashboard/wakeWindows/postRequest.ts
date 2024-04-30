import { Type } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

/**活動時間*/
export interface WakeWindows {
  babyId: number;
  time: number;
  type: Type;
  createUser: number;
  changeUser: number;
}
/**入眠までの時間*/
export interface SleepPrepTime {
  babyId: number;
  time: Date;
  createUser: number;
  changeUser: number;
}

export interface PostRequests extends ApiRequest {
  body: {
    data: {
      wakeWindows: WakeWindows[];
      sleepPrepTime: SleepPrepTime;
    };
  };
}
