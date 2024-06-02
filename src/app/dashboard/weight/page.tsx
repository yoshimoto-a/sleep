"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { Footer } from "../_components/footer";
import { Button } from "./_components/Button";
import { ControlButtomWithModal } from "./_components/ControlButtomWithModal";
import { Item } from "./_components/Item";
import { useGetWeight } from "./_hooks/useGetWeight";
import { useVal } from "./_hooks/useVal";
import { dailyIncrease } from "./_utils/dailyIncrease";
import { Input } from "@/app/_components/input";
import { IsLoading } from "@/app/_components/isLoading";
import { Label } from "@/app/_components/label";
import { useApi } from "@/app/_hooks/useApi";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/weight/postRequest";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/weight/postResponse";

export default function Page() {
  const { weight, weightError, date, handleChangeWeight, handleChangeDate } =
    useVal();
  const { data, error, isLoading, mutate, babyId, dbUserId } = useGetWeight();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { post } = useApi();
  const noData = data?.status !== 200 || !("data" in data) || !data.data;

  if (noData) return;
  if (isLoading) return <IsLoading />;
  if (error) return <div>データの取得に失敗しました</div>;

  const handleSave = async () => {
    if (!dbUserId || !babyId || !weight) return;
    setIsSubmitting(true);
    const prams = {
      data: {
        babyId,
        weight,
        measurementDate: new Date(date),
        createUser: dbUserId,
        changeUser: dbUserId,
      },
    };
    try {
      await post<PostRequests, PostResponse>("/api/dashboard/weight", prams);
      handleChangeWeight("");
      mutate();
    } catch (e) {
      alert("データの登録に失敗しました");
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <h1 className="pt-10 text-center text-lg">体重</h1>
      <div className="flex justify-center gap-4 pt-5">
        <div className="pl-8 w-1/2">
          <Label htmlFor="measurementDate" text="計測日" />
          <Input
            id="measurementDate"
            type="date"
            value={dayjs(date).format("YYYY-MM-DD")}
            placeholder=""
            inputMode="numeric"
            disabled={isSubmitting}
            onChange={value => handleChangeDate(value)}
          />
        </div>
        <div className="pr-8 w-1/2">
          <Label htmlFor="weight" text="体重" />
          <Input
            id="weight"
            type="number"
            value={weight ? weight.toString() : ""}
            placeholder="3000g"
            inputMode="numeric"
            disabled={isSubmitting}
            onChange={value => handleChangeWeight(value)}
          />
        </div>
      </div>
      <div className="flex justify-center gap-4 pt-5">
        {/* 体重のグラフ描画が完成したらこのボタンから遷移させる
        <Button
          text="成長曲線"
          onclick={() => {
            router.replace("/dashboard/sleep");
          }}
        /> */}
        <Button disabled={isSubmitting} text="保存" onclick={handleSave} />
      </div>
      <div className="pt-8 w-full flex flex-col items-center">
        <div className="border-b border-slate-600 w-4/5 py-2 flex justify-center gap-4 pr-6">
          <Item item="日付" />
          <Item item="体重" />
          <Item item="g/日" />
        </div>
        {!noData ? (
          data.data.map((item, index) => (
            <div
              key={item.id}
              className="border-b border-slate-600 w-4/5 py-2 flex justify-center gap-4"
            >
              <Item item={dayjs(item.measurementDate).format("YYYY/MM/DD")} />
              <Item item={`${item.weight.toLocaleString().toString()}g`} />
              {weightError && <p>{weightError}</p>}

              <Item
                item={
                  index !== 0
                    ? `${dailyIncrease(item, data.data[index - 1])}g/日`
                    : "-"
                }
              />
              <ControlButtomWithModal
                isSubmitting={isSubmitting}
                rowItem={item}
                mutate={mutate}
              />
            </div>
          ))
        ) : (
          <div className="text-canter mt-10">データがありません</div>
        )}
      </div>
      <Footer />
    </>
  );
}
