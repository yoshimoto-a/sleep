"use client";
import { Footer } from "../_components/footer";
import { HeaderArea } from "./_components/HeaderArea";
import { ToggleArea } from "./_components/ToggleArea";
import { useGrowth } from "./_hooks/useGrowth";
import { IsLoading } from "@/app/_components/isLoading";
export default function Page() {
  const { state, handlers, date, isLoading, error, updateDate } = useGrowth();

  if (isLoading) return <IsLoading />;
  if (error) return "データの取得に失敗しました";

  return (
    <div className="flex flex-col mb-[68px]">
      <h1 className="pt-10 text-center text-lg">発達記録</h1>
      <HeaderArea />
      <ToggleArea
        date={date}
        state={state}
        handlers={handlers}
        updateDate={updateDate}
      />
      <Footer />
    </div>
  );
}
