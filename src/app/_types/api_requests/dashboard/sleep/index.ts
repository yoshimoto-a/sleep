import { Role } from "@prisma/client";
import { Milestone } from "@prisma/client";
import { Type } from "@prisma/client";

/**現在の月齢を表示*/
interface Baby {
  id: number;
  name: String;
  birthday: Date;
}

interface User {
  id: number;
  babyId: number;
  supabaseUserId: number;
  userName: String;
  role: Role;
}

/**発達→お勧めねんね時刻の算出*/
interface Growth {
  id: number;
  babyId: number;
  milestone: Milestone;
  startedAt: Date;
  archevedAt: Date;
}
/**睡眠時間→一覧表示・表・現在の活動時間の算出*/
interface SleepingSituation {
  id: number;
  babyId: number;
  bedTime: Date;
  sleep: Date;
  wakeup: Date;
}
/**活動時間→お勧めねんね時刻の算出*/
interface ActivityTime {
  id: number;
  babyId: number;
  time: Date;
  type: Type;
}

export interface IndexSuccessResponse {
  status: number;
  data: {
    baby: Baby;
    user: User;
    growth: Growth;
    sleepingSituation: SleepingSituation;
    activityTime: ActivityTime;
  };
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;
