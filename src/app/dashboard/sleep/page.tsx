"use client";

import dayjs from "dayjs";
import { useState } from "react";
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
  if (isLoading) return <IsLoading></IsLoading>;
  if (error) return <div>データ取得失敗</div>;

  const handlePrev = () => {
    setDate(dayjs(date).add(-1, "d").toDate());
  };

  const handleNext = () => {
    setDate(dayjs(date).add(1, "d").toDate());
  };

  return (
    <>
      <Header
        date={date}
        onClickPrev={handlePrev}
        onClickNext={handleNext}
      ></Header>
      <div className="flex justify-between mx-10 my-5">
        <MainTime SleepingSituationData={data} />
        <ElapsedTime data={data} />
      </div>
      <div className="grid grid-cols-10">
        <div className="bg-white col-span-3">グラフ</div>
        <div className="relative col-span-7 h-full">
          <ShowData
            data={data}
            isLoading={isLoading}
            error={error}
            mutate={mutate}
          ></ShowData>
          <ButtonArea mutate={mutate}></ButtonArea>
        </div>
      </div>
    </>
  );
}
