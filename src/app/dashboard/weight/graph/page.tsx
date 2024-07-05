"use client";
import { Footer } from "../../_components/footer";
import { useWeights } from "../_hooks/useWeights";
import { Graph } from "./_components/Graph";
import { IsLoading } from "@/app/_components/isLoading";

export default function Page() {
  const { data, error, isLoading } = useWeights();

  if (isLoading) return <IsLoading />;
  if (error)
    return <div className="text-center">データの取得に失敗しました</div>;
  if (!data) return <div className="text-center">データがありません</div>;
  return (
    <>
      <h1 className="pt-5 text-center text-lg">体重グラフ</h1>
      <Graph data={data.graphData}></Graph>
      <Footer />
    </>
  );
}
