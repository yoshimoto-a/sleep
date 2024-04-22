import { Gender } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

/**現在の月齢を表示するため*/
interface Baby {
  name: String;
  birthday: Date;
  expectedDateOfBirth: Date;
  birthWeight: number;
  gender: Gender;
}
export interface PostRequests extends ApiRequest {
  body: Baby;
}
