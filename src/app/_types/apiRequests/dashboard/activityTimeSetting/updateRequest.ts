import { Type } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

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
export interface UpdateRequests extends ApiRequest {
  body: {
    id: number;
    data: {
      activityTime: ActivityTime | ActivityTime[];
      sleepPrepTime: SleepPrepTime;
    };
  };
}
