import { Action } from "./action";
export type ButtonName = "一括登録" | "寝かしつけ" | "寝た" | "起きた";

export type Buttons = {
  icon: string;
  text: ButtonName;
  action: Action;
  onclick: () => void | Promise<void>;
};
