export interface ContainNull {
  id: number;
  bedTime: Date | null;
  sleep: Date | null;
  wakeup: Date | null;
  changeUser: number;
}
export interface CompletedData {
  id: number;
  bedTime: Date | null;
  sleep: Date;
  wakeup: Date;
  changeUser: number;
}
