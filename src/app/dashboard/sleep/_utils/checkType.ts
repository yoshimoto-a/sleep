import { ActionName } from "@/app/_types/apiRequests/dashboard/sleep";
type Action = "bedTime" | "sleep" | "wakeup";
export const checkType = (action: Action): ActionName => {
  switch (action) {
    case "bedTime":
      return "寝かしつけ";
    case "sleep":
      return "寝た";
    case "wakeup":
      return "起きた";
  }
};
