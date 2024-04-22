import { Milestone } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

/**発達テーブル*/
export interface Growth {
  babyId: number;
  milestone: Milestone;
  startedAt: Date;
  archevedAt: Date;
  createUser: number;
  changeUser: number;
}
export interface updateRequests extends ApiRequest {
  body: {
    id: number;
    data: Growth;
  };
}
