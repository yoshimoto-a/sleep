"use client";
import { Footer } from "../_components/footer";
import { WeightForm } from "./_components/WeightForm";
import { WeightList } from "./_components/WeightList";
import { useGetWeight } from "./_hooks/useGetWeight";
import { IsLoading } from "@/app/_components/isLoading";

export default function Page() {
  const { data, error, isLoading, mutate, babyId, dbUserId } = useGetWeight();
  const noData = data?.status !== 200 || !("data" in data) || !data.data;

  if (noData) return;
  if (isLoading) return <IsLoading />;
  if (error) return <div>データの取得に失敗しました</div>;

  return (
    <>
      <h1 className="pt-10 text-center text-lg">体重</h1>
      <WeightForm
        babyId={babyId}
        dbUserId={dbUserId}
        mutate={mutate}
      ></WeightForm>
      <WeightList data={data} mutate={mutate}></WeightList>

      <Footer />
    </>
  );
}
