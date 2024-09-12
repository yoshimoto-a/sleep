"use client";
import { Footer } from "../_components/footer";
import { Header } from "./_component/Header";
import { WeeklyChart } from "./_component/WeeklyChart";
import { useWeeklyNavigation } from "./_hooks/useWeeklyNavigation";
import { useWeeklySleepChart } from "./_hooks/useWeeklySleepChart";
import { IsLoading } from "@/app/_components/isLoading";
export default function Page() {
  const { date, onClickNext, onClickPrev } = useWeeklyNavigation();
  const { chartData, keyname, totalSleepTimeAverage, error, isLoading } =
    useWeeklySleepChart(date);

  if (isLoading) return <IsLoading />;
  if (error)
    return <div className="text-center">データの取得に失敗しました</div>;
  return (
    <>
      <h1 className="pt-5 text-center text-lg">週間チャート</h1>
      <div className="mt-2">
        <Header
          date={date}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
        <WeeklyChart chartData={chartData} keyName={keyname} />
      </div>
      <div className="mt-5 text-center text-xs">
        平均の睡眠時間 :{totalSleepTimeAverage}
      </div>
      <Footer />
    </>
  );
}
