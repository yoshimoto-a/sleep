//体重テーブル
export interface Weight {
  weight: number;
  measurementDate: Date;
  changeUser: number;
}
export interface UpdateRequests {
  id: number;
  data: Weight;
}
