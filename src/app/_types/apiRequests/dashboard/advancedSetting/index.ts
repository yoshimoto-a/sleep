import { Milestone } from "@prisma/client";

/**発達テーブル*/
export interface Growth {
  id: number;
  babyId: number;
  milestone: Milestone;
  startedAt: Date;
  archevedAt: Date;
  createUser: number;
  changeUser: number;
}
export interface IndexResponse {
  status: 200;
  data: Growth[];
}
