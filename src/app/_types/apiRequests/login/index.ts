import { Role } from "@prisma/client";

export interface LoginUser {
  id: number;
  babyId?: number;
  supabaseUserId: String;
  userName?: String;
  role: Role;
}

export interface IndexResponse {
  status: 200;
  data: LoginUser | null;
}
