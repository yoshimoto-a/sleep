type Action = "bedTime" | "sleep" | "wakeup";
export const checkType = (action: Action): string => {
  switch (action) {
    case "bedTime":
      return "寝かしつけ開始";
    case "sleep":
      return "寝た";
    case "wakeup":
      return "起きた";
  }
};
