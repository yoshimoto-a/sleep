import { Gender } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

/**現在の月齢を表示*/
export interface Baby {
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

/**赤ちゃん初回登録時に赤ちゃんIDを登録するためUserテーブル更新 */
interface User {
  id: number;
  babyId: number;
}
export interface UserUpdateRequests extends ApiRequest {
  body: User;
}
