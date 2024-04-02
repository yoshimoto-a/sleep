import { ApiRequest } from "../apiRequest";
import { Role } from "@prisma/client";

interface User {
  //babyId: number;ここでは赤ちゃんの登録まだしていない
  supabaseUserId: string;
  userName: string;
  role: Role;
}
export interface PostRequests extends ApiRequest {
  body: User;
}
