//体重テーブル
export interface Weight {
  babyId: number;
  weight: number;
  measurementDate: Date;
  createUser: number;
  changeUser: number;
}
export interface updateRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    id: number;
    data: Weight;
  };
}
