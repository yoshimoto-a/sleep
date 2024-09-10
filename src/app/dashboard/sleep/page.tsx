"use client";

import { Footer } from "../_components/footer";
import { Bedtime } from "./_component/Bedtime";
import { ButtonArea } from "./_component/ButtonArea";
import { Chart } from "./_component/Chart";
import { ElapsedTime } from "./_component/ElapsedTime";
import { GuideWithModal } from "./_component/GuideWithModal";
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
  if (error)
    return <div className="text-center">データの取得に失敗しました</div>;

  return (
    <>
      <Header date={date} onClickPrev={handlePrev} onClickNext={handleNext} />
      {!data ? (
        <div className="text-center">データが存在しません</div>
      ) : (
        <>
          <div className="flex justify-between mx-auto mt-4 mb-2 px-4">
            <MainTime latestData={data.latestData} />
            <ElapsedTime data={data.latestData} />
          </div>
          <div className="flex justify-between px-5 pb-2">
            <Bedtime
              prepData={data.sleepPrepTime}
              latestData={data.latestData}
            />
            <GuideWithModal />
          </div>
          <div className="grid grid-cols-10 mx-1">
            <div className="col-span-3 flex flex-col items-center">
              <Chart chartData={data.chartData} keyName={data.keyName} />
              <div className="flex justify-center w-full mt-2">
                <TotalSleepTime totalSleepTime={data.totalSleepTime} />
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
        </>
      )}
      <div className="fixed bottom-25 w-full bg-white z-0">
        <ButtonArea
          mutate={mutate}
          latestAction={data?.latestData?.action}
          hasLatestBedtimeData={data?.hasLatestBedtimeData}
        />
      </div>
      <Footer />
    </>
  );
}
