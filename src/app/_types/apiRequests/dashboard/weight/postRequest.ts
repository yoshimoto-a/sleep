//体重テーブル
export interface Weight {
  babyId: number;
  weight: number;
  measurementDate: Date;
  createUser: number;
  changeUser: number;
}
export interface PostRequests {
  data: Weight;
}
