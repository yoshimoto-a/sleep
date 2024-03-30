import { Gender } from "@prisma/client";

/**現在の月齢を表示*/
interface Baby {
  name: String;
  birthday: Date;
  expectedDateOfBirth: Date;
  birthWeight: number;
  gender: Gender;
}
export interface updateRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    id: number;
    data: Baby;
  };
}
