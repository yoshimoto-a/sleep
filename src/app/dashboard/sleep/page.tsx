"use client";

import { Footer } from "../_components/footer";
import { ButtonArea } from "./_component/ButtonArea";
import { Chart } from "./_component/Chart";
import { ElapsedTime } from "./_component/ElapsedTime";
import { Header } from "./_component/Header";
import { MainTime } from "./_component/MainTime";
import { ShowData } from "./_component/ShowData";
import { TotalSleepTime } from "./_component/TotalSleepTime";
import { useSleepDashBoard } from "./_hooks/useSleepDashboard";
import { IsLoading } from "@/app/_components/isLoading";

export default function Page() {
  const { isLoading, data, error, mutate, handleNext, handlePrev, date } =
    useSleepDashBoard();
  if (isLoading) return <IsLoading />;
  if (error) return <div>データ取得失敗</div>;

  return (
    <>
      <Header date={date} onClickPrev={handlePrev} onClickNext={handleNext} />
      <div className="flex justify-between mx-5 my-5">
        <MainTime SleepingSituationData={data} />
        <ElapsedTime data={data?.latestData} />
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
