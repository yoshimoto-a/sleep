import { useState, useEffect } from "react";
import { FormatDuration } from "../_utils/formatDuration";
import { SleepingSituationResponse } from "@/app/_types/apiRequests/dashboard/sleep";

interface PropsItem {
  data: SleepingSituationResponse | undefined;
}

export const ElapsedTime: React.FC<PropsItem> = ({ data }) => {
  const [action, setAction] = useState<string>("");
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!data) return;
    if (!data.latestData) {
      setAction("");
      setElapsedTime("登録なし");
      return;
    } else {
      switch (data.latestData.action) {
        case "寝かしつけ開始":
          setAction("入眠所要時間");
          if (data.latestData.record.bedTime)
            setElapsedTime(
              FormatDuration(
                data.latestData.record.bedTime,
                currentTime,
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
                currentTime,
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
                currentTime,
                "HourAndMinutes"
              )
            );
          break;
      }
      return;
    }
  }, [data, data?.latestData?.action, data?.latestData?.record, currentTime]);

  return (
    <div className="rounded-md bg-white w-40 pt-2 text-center">
      <span className="text-sm">{action}</span>
      <div className="flex items-center justify-center">
        <span className="text-3xl pb-3">{elapsedTime}</span>
      </div>
    </div>
  );
};
