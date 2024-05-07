import { ApiRequest } from "../../apiRequest";

/**発達テーブル*/
export interface Growth {
  babyId: number;
  startedAt: Date;
  archevedAt: Date;
  changeUser: number;
}
export interface updateRequests extends ApiRequest {
  body: { id: number; data: Growth };
}
