import { Type } from "@prisma/client";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetBaby } from "../../_hooks/useBaby";
import { useGetGrowth } from "../../_hooks/useGetGrowth";
import { useGetWakeWindows } from "../../_hooks/useGetWakeWindows";
import { fromSleepLength } from "../_utils/fromSleepLength";
import { SleepingSituationComp } from "@/app/_types/apiRequests/dashboard/sleep";
import { WakeWindows } from "@/app/_types/apiRequests/dashboard/wakeWindows";
import { FindLatestResponse } from "@/app/api/dashboard/sleep/_utils/findLatest";
export const useNextSleepTime = (lastestData: FindLatestResponse) => {
  const targetData = lastestData.record;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const {
    data: growthData,
    error: growthError,
    isLoading: growthIsLoading,
  } = useGetGrowth();
  const {
    data: wakeWindowsData,
    error: wakeWindowsError,
    isLoading: wakeWindowsIsLoading,
  } = useGetWakeWindows();
  const {
    data: babyData,
    error: babyError,
    isLoading: babyIsLoading,
  } = useGetBaby();

  if (lastestData.action !== "起きた") return;

  let data: SleepingSituationComp = {
    id: 0,
    babyId: 0,
    bedTime: null,
    sleep: new Date(),
    wakeup: new Date(),
    createUser: 0,
    changeUser: 0,
    created: new Date(),
    updated: new Date(),
  };
  if (targetData.wakeup && targetData.sleep) {
    data = targetData as SleepingSituationComp;
  }

  setIsLoading(growthIsLoading || wakeWindowsIsLoading || babyIsLoading);
  setError(growthError || wakeWindowsError || babyError);
  //活動時間から減算する時間を算出する
  //直近の睡眠時間から算出
  let reduction: number = 0;
  reduction = fromSleepLength(babyData, data);
  //発達の状況から算出
  if (!growthData || !("data" in growthData)) return; //なに返すか要検討
  const practicing = growthData.data.filter(
    item => item.startedAt && !item.archevedAt
  );
  const justMade = growthData.data.filter(item => {
    const sevenDaysAgo = dayjs().subtract(7, "day");
    return dayjs(item.archevedAt).isAfter(sevenDaysAgo);
  });

  if (practicing || justMade) {
    reduction += 15;
  }
  const walking = justMade.filter(Item => Item.milestone === "WALKING");
  if (walking.length != 0) {
    reduction += 15;
  }
  if (!wakeWindowsData || !("data" in wakeWindowsData)) return; //なに返すか要検討
  const { activityTime } = wakeWindowsData.data;

  const getActivityTime = (data: WakeWindows[], type: Type) => {
    const activity = data.find(item => item.type === type);
    return activity ? activity.time : 0;
  };
  const all = getActivityTime(activityTime, "ALL");
  const morning = getActivityTime(activityTime, "MORNING");
  const noon = getActivityTime(activityTime, "NOON");
  const evening = getActivityTime(activityTime, "EVENING");

  //現在の時刻で使う活動時間を判断する
  currentTime;
  return { isLoading, error };
};
