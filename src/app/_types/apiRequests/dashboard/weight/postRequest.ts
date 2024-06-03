//体重テーブル
export interface Weight {
  weight: number;
  measurementDate: Date;
  createUser: number;
  changeUser: number;
}
export interface PostRequests {
  data: Weight;
}
