"use client";
import { Footer } from "../_components/footer";
import { WeightForm } from "./_components/WeightForm";
import { WeightList } from "./_components/WeightList";
import { useWeights } from "./_hooks/useWeights";
import { IsLoading } from "@/app/_components/isLoading";

export default function Page() {
  const { data, error, isLoading, mutate, isSubmitting, createWeight } =
    useWeights();

  if (isLoading) return <IsLoading />;
  if (error) return <div>データの取得に失敗しました</div>;

  return (
    <>
      <h1 className="pt-5 text-center text-lg">体重</h1>
      <WeightForm
        createWeight={createWeight}
        isSubmitting={isSubmitting}
      ></WeightForm>
      <WeightList data={data} mutate={mutate}></WeightList>

      <Footer />
    </>
  );
}
