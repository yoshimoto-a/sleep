import { Gender } from "@prisma/client";

/**現在の月齢を表示するため*/
interface Baby {
  name: String;
  birthday: Date;
  expectedDateOfBirth: Date;
  birthWeight: number;
  gender: Gender;
}
export interface PostRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    data: Baby;
  };
}
