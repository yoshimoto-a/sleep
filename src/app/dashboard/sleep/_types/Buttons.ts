import { Action } from "./action";
import { ActionName } from "@/app/_types/apiRequests/dashboard/sleep";

export type ButtonNames = ActionName | "一括登録";

export type Buttons = {
  icon: string;
  text: ButtonNames;
  action: Action;
  onclick: () => void | Promise<void>;
};
