"use client";
import dayjs from "dayjs";
import { useVal } from "../_hooks/useVal";
import { Button } from "./Button";
import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";

interface Props {
  isSubmitting: boolean;
  createWeight: (
    weight: number,
    date: string,
    handleChangeWeight: (val: string) => void
  ) => void;
}
export const WeightForm: React.FC<Props> = ({ isSubmitting, createWeight }) => {
  const { weight, weightError, date, handleChangeWeight, handleChangeDate } =
    useVal();

  const handleSave = async () => {
    if (!weight) return;
    createWeight(weight, date, handleChangeWeight);
  };

  return (
    <>
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
          {weightError && <p>{weightError}</p>}
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
    </>
  );
};
