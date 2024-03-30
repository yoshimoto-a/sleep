import { Milestone } from "@prisma/client";

/**発達*/
export interface Growth {
  babyId: number;
  milestone: Milestone;
  startedAt: Date;
  archevedAt: Date;
  createUser: number;
  changeUser: number;
}
export interface PostRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    data: Growth[]; //Milestoneのかずだけ最初にPOSTする
  };
}
