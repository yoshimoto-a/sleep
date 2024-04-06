import { ApiRequest } from "../apiRequest";
import { Role } from "@prisma/client";

interface User {
  supabaseUserId: string;
  role: Role;
  userName: string;
}
export interface PostRequests extends ApiRequest {
  body: User;
}
