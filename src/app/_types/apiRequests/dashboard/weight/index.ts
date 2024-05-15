export interface Weight {
  id: number;
  babyId: number;
  weight: number;
  measurementDate: Date;
  createUser: number;
  changeUser: number;
}

export interface IndexSuccessResponse {
  status: 200;
  data: Weight[];
}

export interface IndexErrorResponse {
  status: number;
  error: string;
}

export type IndexResponse = IndexSuccessResponse;
