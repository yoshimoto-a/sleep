import { Milestone } from "@prisma/client";

/**発達テーブル*/
export interface Growth {
  babyId: number;
  milestone: Milestone;
  startedAt: Date;
  archevedAt: Date;
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
    data: Growth;
  };
}
