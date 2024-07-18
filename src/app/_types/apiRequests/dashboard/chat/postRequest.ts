import { ApiRequest } from "../../apiRequest";

export interface Chat {
  babyId: number;
  text: String;
}
export interface PostRequests extends ApiRequest {
  body: {
    data: Chat;
  };
}
