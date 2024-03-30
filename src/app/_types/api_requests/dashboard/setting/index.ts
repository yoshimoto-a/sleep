import { Gender } from "@prisma/client";

/**現在の月齢を表示*/
interface Baby {
  id: number;
  name: String;
  birthday: Date;
  expectedDateOfBirth: Date;
  birthWeight: number;
  gender: Gender;
}
export interface IndexSuccessResponse {
  status: number;
  data: Baby;
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;
