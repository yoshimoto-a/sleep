/**　各活動時間を返す関数*/
import { WakeWindows } from "@prisma/client";
import { Type } from "@prisma/client";

export const applyWakeWindows = (wakeWindows: WakeWindows[]) => {
  //適用する活動時間
  const getActivityTime = (data: WakeWindows[], type: Type) => {
    const activity = data.find(item => item.type === type);
    return activity ? activity.time : 0;
  };
  const all = getActivityTime(wakeWindows, "ALL");
  const morning = getActivityTime(wakeWindows, "MORNING");
  const noon = getActivityTime(wakeWindows, "NOON");
  const evening = getActivityTime(wakeWindows, "EVENING");

  return { all, morning, noon, evening };
};
