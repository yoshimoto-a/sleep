import { Action } from "./action";
import { ActionName } from "@/app/_types/apiRequests/dashboard/sleep";

export type ButtonNames = ActionName | "一括登録";

// ActionとActionNameのマッピングを制限
export type ActionNameMap = {
  bedTime: "寝かしつけ";
  sleep: "寝た";
  wakeup: "起きた";
};

export type MappedActionName<T extends Action> = ActionNameMap[T];

export type Buttons<T extends Action> = {
  icon: string;
  text: MappedActionName<T> | "一括登録";
  action: T;
  onclick: () => void | Promise<void>;
};
