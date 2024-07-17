import { ApiRequest } from "../apiRequest";
/** */
interface User {
  supabaseUserId: string;
}
export interface PostRequests extends ApiRequest {
  body: User;
}
