import { Type } from "@prisma/client";

/**活動時間*/
export interface ActivityTime {
  babyId: number;
  time: Date;
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

export interface PostRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    data: {
      activityTime: ActivityTime | ActivityTime[];
      sleepPrepTime: SleepPrepTime;
    };
  };
}
