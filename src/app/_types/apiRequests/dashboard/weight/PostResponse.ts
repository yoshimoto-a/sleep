import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";

interface Weight {
  babyId: number;
  weight: number;
  measurementDate: Date;
}
export interface PostResponse extends ApiResponse {
  data?: Weight;
}
