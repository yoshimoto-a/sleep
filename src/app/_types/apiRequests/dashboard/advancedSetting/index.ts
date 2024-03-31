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
export interface IndexSuccessResponse {
  status: number;
  data: Growth[];
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;
