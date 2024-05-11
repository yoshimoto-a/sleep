/**発達テーブル*/
export interface Growth {
  babyId: number;
  startedAt: Date | null;
  archevedAt: Date | null;
  changeUser: number;
}
export interface updateRequests {
  id: number;
  data: Growth;
}
