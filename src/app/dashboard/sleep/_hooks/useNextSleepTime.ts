import { useState, useEffect } from "react";
import { useGetBaby } from "../../_hooks/useBaby";
import { useGetGrowth } from "../../_hooks/useGetGrowth";
import { useGetWakeWindows } from "../../_hooks/useGetWakeWindows";
import { FindLatestResponse } from "@/app/api/dashboard/sleep/_utils/findLatest";
export const useNextSleepTime = (lastestData: FindLatestResponse) => {
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
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  console.log(wakeWindowsError, babyError);
  return { currentTime, growthError, wakeWindowsData, babyData };
  //活動時間から減算する
};
