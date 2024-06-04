import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";

interface Weight {
  babyId: number;
  weight: number;
  measurementDate: Date;
  createUser: number;
  changeUser: number;
}
export interface PostResponse extends ApiResponse {
  data?: Weight;
}
