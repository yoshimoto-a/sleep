import { Gender } from "@prisma/client";

/**現在の月齢を表示*/
interface Baby {
  id: number;
  name: string;
  birthday: Date;
  expectedDateOfBirth: Date;
  birthWeight: number;
  gender: Gender;
  created: Date;
  updated: Date;
}
export interface IndexResponse {
  status: 200;
  data: Baby;
}
