import { ApiRequest } from "../apiRequest";
import { Role } from "@prisma/client";

interface User {
  supabaseUserId: string;
  role: Role;
  babyId: number | undefined | null;
}
export interface PostRequests extends ApiRequest {
  body: User;
}
