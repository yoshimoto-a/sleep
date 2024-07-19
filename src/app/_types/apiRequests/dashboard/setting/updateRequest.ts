import { Gender } from "@prisma/client";
import { ApiRequest } from "../../apiRequest";

/**現在の月齢を表示*/
export interface UpdateRequests {
  name: string;
  birthday: Date;
  expectedDateOfBirth: Date;
  birthWeight: number;
  gender: Gender;
}

/**赤ちゃん初回登録時に赤ちゃんIDを登録するためUserテーブル更新 */
interface User {
  id: number;
  babyId: number;
}
export interface UserUpdateRequests extends ApiRequest {
  body: User;
}
