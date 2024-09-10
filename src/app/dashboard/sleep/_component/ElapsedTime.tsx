import { useState, useEffect } from "react";
import { FormatDuration } from "../_utils/formatDuration";
import { FindLatestResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";

interface PropsItem {
  data: FindLatestResponse | undefined;
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
    if (!data) {
      setAction("");
      setElapsedTime("登録なし");
      return;
    } else {
      switch (data.action) {
        case "寝かしつけ":
          setAction("入眠所要時間");
          if (data.record.bedTime)
            setElapsedTime(
              FormatDuration(data.record.bedTime, currentTime, "MinutesOnly")
            );
          break;
        case "寝た":
          setAction("睡眠時間");
          if (data.record.sleep)
            setElapsedTime(
              FormatDuration(data.record.sleep, currentTime, "HourAndMinutes")
            );
          break;
        case "起きた":
          setAction("活動時間");
          if (data.record.wakeup)
            setElapsedTime(
              FormatDuration(data.record.wakeup, currentTime, "HourAndMinutes")
            );
          break;
      }
    }
  }, [data, data?.action, data?.record, currentTime]);

  return (
    <div className="rounded-md bg-white w-[45%] pt-2 text-center">
      <span className="text-sm">{action}</span>
      <div className="flex items-center justify-center">
        <span className="text-3xl pb-3">{elapsedTime}</span>
      </div>
    </div>
  );
};
