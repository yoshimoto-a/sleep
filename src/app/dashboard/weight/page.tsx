"use client";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Footer } from "../_components/footer";
import { Button } from "./_components/Button";
import { EditButton } from "./_components/EditButton";
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
  const { post } = useApi();
  const noData = data?.status !== 200 || !("data" in data) || !data.data;
  useEffect(() => {
    if (noData) return;
  }, [isLoading, data]);
  if (isLoading) return <IsLoading></IsLoading>;
  if (error) return <div>データの取得に失敗しました</div>;

  const handleSave = async () => {
    console.log(dbUserId, babyId, weight);
    if (!dbUserId || !babyId || !weight) return;
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
      mutate();
    } catch (e) {
      alert("データの登録に失敗しました");
    }
  };
  return (
    <>
      <h1 className="pt-5 text-center text-lg">体重</h1>
      <div className="flex justify-center gap-4 pt-5">
        <div className="pl-8 w-1/2">
          <Label htmlFor="measurementDate" text="計測日"></Label>
          <Input
            id="measurementDate"
            type="date"
            value={dayjs(date).format("YYYY-MM-DD")}
            placeholder=""
            inputMode="numeric"
            onChange={value => handleChangeDate(value)}
          ></Input>
        </div>
        <div className="pr-8 w-1/2">
          <Label htmlFor="weight" text="体重"></Label>
          <Input
            id="weight"
            type="number"
            value={weight ? weight.toString() : ""}
            placeholder="3000g"
            inputMode="numeric"
            onChange={value => handleChangeWeight(value)}
          ></Input>
        </div>
      </div>
      <div className="flex justify-center gap-4 pt-5">
        {/* <Button
          text="成長曲線"
          onclick={() => {
            router.replace("/dashboard/sleep");
          }}
        ></Button> */}
        <Button text="保存" onclick={handleSave}></Button>
      </div>
      <div className="pt-8 w-full flex flex-col items-center">
        <div className="border-b border-slate-600 w-4/5 py-2 flex justify-center gap-4 pr-6">
          <Item item="日付"></Item>
          <Item item="体重"></Item>
          <Item item="g/日"></Item>
        </div>
        {!noData ? (
          data.data.map((item, index) => (
            <div
              key={item.id}
              className="border-b border-slate-600 w-4/5 py-2 flex justify-center gap-4"
            >
              <Item
                item={dayjs(item.measurementDate).format("YYYY/MM/DD")}
              ></Item>
              <Item item={`${item.weight.toLocaleString().toString()}g`}></Item>
              {weightError && <p>{weightError}</p>}

              <Item
                item={
                  index !== 0
                    ? `${dailyIncrease(item, data.data[index - 1])}g/日`
                    : "-"
                }
              ></Item>
              <EditButton rowItem={item} mutate={mutate}></EditButton>
            </div>
          ))
        ) : (
          <div className="text-canter mt-10">データがありません</div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}
