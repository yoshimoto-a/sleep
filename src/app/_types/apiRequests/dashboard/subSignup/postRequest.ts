import { ApiRequest } from "../../apiRequest";

export interface PostRequests extends ApiRequest {
  body: { email: string; babyId: number };
}
