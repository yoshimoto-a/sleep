export interface Chat {
  id: number;
  babyId: number;
  text: String;
  createUser: number;
}
export interface IndexSuccessResponse {
  status: number;
  data: Chat[];
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse | IndexErrorResponse;
