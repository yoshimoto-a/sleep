import { Gender } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

/**現在の月齢を表示*/
interface Baby {
  name: String;
  birthday: Date;
  expectedDateOfBirth: Date;
  birthWeight: number;
  gender: Gender;
}
export interface UpdateRequests extends ApiRequest {
  body: {
    id: number;
    data: Baby;
  };
}
