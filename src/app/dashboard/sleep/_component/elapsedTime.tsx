import { useState, useEffect } from "react";
import { FormatDuration } from "../_utils/formatDuration";
import { SleepingSituationResponse } from "@/app/_types/apiRequests/dashboard/sleep";

interface PropsItem {
  data: SleepingSituationResponse | undefined;
}

export const ElapsedTime: React.FC<PropsItem> = ({ data }) => {
  const [action, setAction] = useState<string>("");
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);
  useEffect(() => {
    if (!data) return;
    switch (data.latestData.action) {
      case "寝かしつけ開始":
        setAction("入眠所要時間");
        if (data.latestData.record.bedTime)
          setElapsedTime(
            FormatDuration(
              data.latestData.record.bedTime,
              new Date(),
              "MinutesOnly"
            )
          );
        break;
      case "寝た":
        setAction("睡眠時間");
        if (data.latestData.record.sleep)
          setElapsedTime(
            FormatDuration(
              data.latestData.record.sleep,
              new Date(),
              "HourAndMinutes"
            )
          );
        break;
      case "起きた":
        setAction("活動時間");
        if (data.latestData.record.wakeup)
          setElapsedTime(
            FormatDuration(
              data.latestData.record.wakeup,
              new Date(),
              "HourAndMinutes"
            )
          );
        break;
    }
  }, [data]);

  return (
    <div className="rounded-md bg-white w-40 pt-2 text-center">
      <span className="text-sm">{action}</span>
      <div className="flex items-center justify-center">
        <span className="text-3xl pb-3">{elapsedTime}</span>
      </div>
    </div>
  );
};
