import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetNextSleepTime } from "../_hooks/useGetNextSleepTime";
import { FormatDuration } from "../_utils/formatDuration";
import { FindLatestResponse } from "@/app/api/dashboard/sleep/_utils/findLatest";

type Title = "活動時間" | "お勧めねんね時刻";
interface PropsItem {
  title: Title;
  lastestData: FindLatestResponse;
}

export const MainTime: React.FC<PropsItem> = ({ title, lastestData }) => {
  const [action, setAction] = useState<string>("");
  const [elapsedTime, setElapsedTime] = useState<string | null | undefined>(
    null
  );
  const { isLoading, data, error, mutate } = useGetNextSleepTime();
  useEffect(() => {
    let time: string | null = null;
    if (title === "活動時間") {
      switch (lastestData.action) {
        case "寝かしつけ開始":
          setAction("入眠所要時間");
          if (lastestData.record.bedTime)
            time = FormatDuration(
              lastestData.record.bedTime,
              new Date(),
              "MinutesOnly"
            );
          break;
        case "寝た":
          setAction("睡眠時間");
          if (lastestData.record.sleep)
            time = FormatDuration(
              lastestData.record.sleep,
              new Date(),
              "HourAndMinutes"
            );
          break;
        case "起きた":
          setAction("活動時間");
          if (lastestData.record.wakeup)
            time = FormatDuration(
              lastestData.record.wakeup,
              new Date(),
              "HourAndMinutes"
            );
          break;
      }
    } else {
      switch (lastestData.action) {
        case "起きた":
          setAction("お勧めねんね時刻");
          break;
        default:
          setAction("睡眠中");
      }
    }
    setElapsedTime(time);
  }, [title, lastestData]);

  if (isLoading) return <div>読込み中...</div>;
  if (error) return <div>エラー発生</div>;
  setElapsedTime(data && data.data);

  return (
    <div className="rounded-md bg-white w-40 pt-2 text-center">
      <span className="text-sm">{action}</span>
      <div className="flex items-center justify-center">
        <span className="text-3xl pb-3">
          {action === "睡眠中" ? (
            <Image
              src="/sleep/sleeping.png"
              alt="睡眠中"
              height={0}
              width={0}
              style={{ width: "40px", height: "auto" }}
            ></Image>
          ) : (
            elapsedTime
          )}
        </span>
      </div>
    </div>
  );
};
