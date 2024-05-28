import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetNextSleepTime } from "../_hooks/useGetNextSleepTime";
import { SleepingSituationResponse } from "@/app/_types/apiRequests/dashboard/sleep";

interface PropsItem {
  SleepingSituationData: SleepingSituationResponse | undefined;
}

export const MainTime: React.FC<PropsItem> = ({ SleepingSituationData }) => {
  console.log(SleepingSituationData?.data);
  const [action, setAction] = useState<string>("");
  const [elapsedTime, setElapsedTime] = useState<string | null>(null);
  const { isLoading, data, error } = useGetNextSleepTime();
  useEffect(() => {
    if (data) {
      setElapsedTime(data.data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (SleepingSituationData) {
      switch (SleepingSituationData.latestData.action) {
        case "起きた":
          setAction("お勧めねんね時刻");
          break;
        default:
          setAction("睡眠中");
      }
    }
  }, [SleepingSituationData, isLoading]);

  if (isLoading) return <div>読込み中...</div>;
  if (error) return <div>エラー発生</div>;

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
