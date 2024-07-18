import { Milestone } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

/**発達*/
export interface Growth {
  babyId: number;
  milestone: Milestone;
  startedAt: Date;
  archevedAt: Date;
}
export interface PostRequests extends ApiRequest {
  body: {
    data: Growth[]; //Milestoneのかずだけ最初にPOSTする
  };
}
