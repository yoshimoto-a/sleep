"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { dayjs } from "../../../../utils/dayjs";
import { useGetBaby } from "../../_hooks/useGetBaby";
import { useGetNextSleepTime } from "../_hooks/useGetNextSleepTime";
import { FindLatestResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";

interface PropsItem {
  latestData: FindLatestResponse;
}

export const MainTime: React.FC<PropsItem> = ({ latestData }) => {
  const [action, setAction] = useState<string>("");
  const [elapsedTime, setElapsedTime] = useState<string | null | undefined>(
    null
  );
  const { isLoading, data, error, mutate } = useGetNextSleepTime();
  const {
    isLoading: isLoadingBaby,
    data: babyData,
    error: babyError,
  } = useGetBaby();

  useEffect(() => {
    mutate();
  }, [latestData, mutate]);

  useEffect(() => {
    if (isLoading) return;
    if (!data) return;
    if (data === "no wakeWindowsData") {
      //活動時間の設定がない
      setAction("活動時間");
      setElapsedTime("登録なし");
      return;
    }
    if (data === "no sleepingSituationData") {
      //登録データがない
      setAction("起きたデータ");
      setElapsedTime("登録なし");
      return;
    }
    if (data) {
      setElapsedTime(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    switch (latestData.action) {
      case "起きた":
        setAction("お勧めねんね時刻");
        break;
      default:
        setAction("睡眠中");
    }
  }, [latestData]);

  //生後6か月以降で早朝起きしている場合、6時過ぎたらお勧めは8時に設定
  useEffect(() => {
    if (elapsedTime !== "即時") return;
    if (
      babyData &&
      Math.floor(dayjs().diff(dayjs(babyData.data.birthday), "month")) <= 5
    )
      return;
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 6) {
        setElapsedTime("8時00分");
        clearInterval(intervalId);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [elapsedTime, babyData]);

  if (isLoading || isLoadingBaby)
    return <div className="text-center">読込み中...</div>;
  if (error || babyError) return <div className="text-center">エラー発生</div>;
  return (
    <div className="rounded-md bg-white w-40 pt-2 text-center">
      <span className="text-sm">{action}</span>
      <div className="flex items-center justify-center">
        <span className="text-3xl pb-3">
          {action === "睡眠中" ? (
            <Image
              src="/sleep/sleeping.png"
              alt="睡眠中"
              height={40}
              width={40}
            />
          ) : (
            elapsedTime
          )}
        </span>
      </div>
    </div>
  );
};
