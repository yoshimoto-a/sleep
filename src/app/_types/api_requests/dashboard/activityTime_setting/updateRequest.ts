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
export interface updateRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    id: number;
    data: {
      activityTime: ActivityTime | ActivityTime[];
      sleepPrepTime: SleepPrepTime;
    };
  };
}
