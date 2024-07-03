"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { Footer } from "../_components/footer";
import { Chart } from "./_component/Chart";
import { TotalSleepTime } from "./_component/TotalSleepTime";
import { ButtonArea } from "./_component/buttonArea";
import { ElapsedTime } from "./_component/elapsedTime";
import { Header } from "./_component/header";
import { MainTime } from "./_component/mainTime";
import { ShowData } from "./_component/showData";
import { useGetData } from "./_hooks/useGetData";
import { IsLoading } from "@/app/_components/isLoading";

export default function Page() {
  const [date, setDate] = useState(new Date());
  const { isLoading, data, error, mutate } = useGetData(date);
  if (isLoading) return <IsLoading />;
  if (error) return <div>データ取得失敗</div>;
  const handlePrev = () => {
    setDate(dayjs(date).add(-1, "d").toDate());
  };
  const handleNext = () => {
    setDate(dayjs(date).add(1, "d").toDate());
  };
  return (
    <>
      <Header date={date} onClickPrev={handlePrev} onClickNext={handleNext} />
      <div className="flex justify-between mx-5 my-5">
        <MainTime SleepingSituationData={data} />
        <ElapsedTime data={data} />
      </div>
      <div className="grid grid-cols-10 mx-1">
        <div className="col-span-3 flex flex-col items-center">
          <Chart chartData={data?.chartData} keyName={data?.keyName}></Chart>
          <div className="flex justify-center w-full mt-2">
            <TotalSleepTime
              totalSleepTime={data?.totalSleepTime}
            ></TotalSleepTime>
          </div>
        </div>
        <div className="relative col-span-7 h-full w-full mx-auto mb-[164px]">
          <ShowData
            data={data}
            isLoading={isLoading}
            error={error}
            mutate={mutate}
          />
        </div>
      </div>
      <div className="fixed bottom-25 w-full bg-white z-0">
        <ButtonArea mutate={mutate} />
      </div>
      <Footer />
    </>
  );
}
