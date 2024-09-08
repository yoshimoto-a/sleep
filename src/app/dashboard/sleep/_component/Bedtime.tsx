"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetNextSleepTime } from "../_hooks/useGetNextSleepTime";
import { FindLatestResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";
import { sleepPrepTime } from "@/app/_types/apiRequests/dashboard/sleep";

interface Props {
  prepData: sleepPrepTime;
  latestData: FindLatestResponse | undefined;
}
export const Bedtime: React.FC<Props> = ({ prepData, latestData }) => {
  //NextSleepTimeのレスポンスは「即時」OR「HH時mm分」のフォーマット
  const { data } = useGetNextSleepTime();
  const [nextSleepTimeData, setNextSleepTimeData] = useState("");
  useEffect(() => {
    if (!data) return;
    setNextSleepTimeData(data);
  }, [data]);

  if (!data) return;
  if (latestData?.action !== "起きた") return;

  const classes = "text-xs text-center pb-2";
  //即時の場合
  if (data === "即時") {
    return <div className={classes}>暗い寝室で過ごしましょう</div>;
  }
  const nextSleepTime = dayjs(
    dayjs().format("YYYY-MM-DD ") +
      nextSleepTimeData.replace("時", ":").replace("分", ":00")
  );
  console.log(prepData);
  const bedtime = nextSleepTime.subtract(prepData.time, "minutes");
  return (
    <div className={classes}>
      寝かしつけ開始時刻は
      <span className="text-sm text-blue-600">{`${bedtime.format(
        "HH時mm分"
      )}`}</span>
      が目安です
    </div>
  );
};
