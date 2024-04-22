import { ApiRequest } from "../../apiRequest";

//体重テーブル
export interface Weight {
  babyId: number;
  weight: number;
  measurementDate: Date;
  createUser: number;
  changeUser: number;
}
export interface UpdateRequests extends ApiRequest {
  body: {
    id: number;
    data: Weight;
  };
}
