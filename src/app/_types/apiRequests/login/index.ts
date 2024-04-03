import { Role } from "@prisma/client";

export interface LoginUser {
  id: number;
  babyId?: number;
  supabaseUserId: String;
  userName?: String;
  role: Role;
}

export interface IndexSuccessResponse {
  status: number;
  data: LoginUser | null;
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;
