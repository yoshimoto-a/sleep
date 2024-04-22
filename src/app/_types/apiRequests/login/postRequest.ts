import { Role } from "@prisma/client";
import { ApiRequest } from "../apiRequest";

interface User {
  supabaseUserId: string;
  role: Role;
  babyId: number | undefined | null;
}
export interface PostRequests extends ApiRequest {
  body: User;
}
