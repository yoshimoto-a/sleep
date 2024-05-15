import { Role } from "@prisma/client";
import { Milestone } from "@prisma/client";
import { Type } from "@prisma/client";
import { FindLatestResponse } from "@/app/api/dashboard/sleep/_utils/findLatest";

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
export interface SleepingSituation {
  id: number;
  babyId: number;
  bedTime: Date | null;
  sleep: Date | null;
  wakeup: Date | null;
  createUser: number;
  changeUser: number;
  created: Date;
  updated: Date;
}
export interface SleepingSituationComp {
  id: number;
  babyId: number;
  bedTime: Date | null;
  sleep: Date;
  wakeup: Date;
  createUser: number;
  changeUser: number;
  created: Date;
  updated: Date;
}

export interface FormatedData {
  id: number;
  HourAndMinutes: string; //時刻
  action: string;
  MinutesOnly: string; //時間
  changer: number;
}

/**活動時間→お勧めねんね時刻の算出*/
interface ActivityTime {
  id: number;
  babyId: number;
  time: Date;
  type: Type;
}

interface BabyData {
  baby: Baby;
  user: User;
  growth: Growth;
  sleepingSituation: SleepingSituation;
  activityTime: ActivityTime;
}

export interface IndexSuccessResponse {
  status: number;
  data: BabyData | BabyData[];
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;

export interface SleepingSituationResponse {
  status: number;
  message: string;
  data: FormatedData[];
  latestData: FindLatestResponse;
}
