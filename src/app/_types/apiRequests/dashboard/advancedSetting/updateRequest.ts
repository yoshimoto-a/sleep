/**発達テーブル*/
export interface Growth {
  babyId: number;
  startedAt: Date;
  archevedAt: Date;
  changeUser: number;
}
export interface updateRequests {
  id: number;
  data: Growth;
}
