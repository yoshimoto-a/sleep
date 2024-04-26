import { useState, useEffect } from "react";
import { FormatDuration } from "../_utils/formatDuration";
import { FindLatestResponse } from "@/app/api/dashboard/sleep/_utils/findLatest";

type Title = "活動時間" | "お勧めねんね時刻";
interface PropsItem {
  title: Title;
  lastestData: FindLatestResponse;
}

export const MainTime: React.FC<PropsItem> = ({ title, lastestData }) => {
  //console.log(lastestData);
  const [action, setAction] = useState<string>("");
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);
  useEffect(() => {
    let elapsedTime: string | null = null;
    if (title === "活動時間") {
      switch (lastestData.action) {
        case "寝かしつけ開始":
          setAction("入眠所要時間");
          if (lastestData.record.bedTime)
            elapsedTime = FormatDuration(
              lastestData.record.bedTime,
              new Date(),
              "MinutesOnly"
            );
          break;
        case "寝た":
          setAction("睡眠時間");
          if (lastestData.record.sleep)
            elapsedTime = FormatDuration(
              lastestData.record.sleep,
              new Date(),
              "HourAndMinutes"
            );
          break;
        case "起きた":
          setAction("活動時間");
          if (lastestData.record.wakeup)
            elapsedTime = FormatDuration(
              lastestData.record.wakeup,
              new Date(),
              "HourAndMinutes"
            );
          //console.log("起きた" + elapsedTime);
          break;
      }
    } else {
      switch (lastestData.action) {
        case "寝かしつけ開始":
          setAction("入眠所要時間");
          break;
        case "寝た":
          setAction("睡眠時間");
          break;
        case "起きた":
          setAction("活動時間");
          break;
      }
    }
    setElapsedTime(elapsedTime);
  }, [title, lastestData]);
  return (
    <div className="rounded-md bg-white w-40 pt-2 text-center">
      <span className="text-sm">{action}</span>
      <div className="flex items-center justify-center">
        <span className="text-3xl pb-3">{elapsedTime}</span>
      </div>
    </div>
  );
};
