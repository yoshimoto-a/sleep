import { ApiRequest } from "../apiRequest";

enum Role {
  MAIN,
  SUB,
}
interface User {
  babyId: number;
  supabaseUserId: number;
  userName: String;
  role: Role;
}
export interface PostRequests extends ApiRequest {
  body: User;
}
