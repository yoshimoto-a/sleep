import { FindLatestResponse } from "../nextSleepTime";

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
  datetime: Date;
  HourAndMinutes: string; //時刻
  action: string;
  MinutesOnly: string; //時間
  changer: number;
}

export interface ChartData {
  date: string;
  [key: string]: number | string;
}

export interface sleepPrepTime {
  time: number;
}
export interface SleepingSituationResponse {
  status: 200;
  message: string;
  data: FormatedData[];
  latestData: FindLatestResponse | undefined;
  chartData: ChartData;
  keyName: string[];
  totalSleepTime: number;
  sleepPrepTime: sleepPrepTime;
}
