/**発達テーブル*/
export interface Growth {
  startedAt: Date | null;
  archevedAt: Date | null;
}
export interface updateRequests {
  id: number;
  data: Growth;
}
