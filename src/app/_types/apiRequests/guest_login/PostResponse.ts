import { Session } from "@supabase/supabase-js";

export interface PostResponse {
  status: 200;
  message: string;
  session: Session;
}
