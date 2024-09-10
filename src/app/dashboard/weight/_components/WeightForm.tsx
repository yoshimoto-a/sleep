"use client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { dayjs } from "../../../../utils/dayjs";
import { useWeightValidation } from "../_hooks/useWeightValidation";
import { Button } from "@/app/_components/Button";
import { Label } from "@/app/_components/Label";
import { Input } from "@/app/_components/input";

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
    useWeightValidation(null, new Date());
  const router = useRouter();

  const handleSave = async () => {
    if (!weight) {
      toast.error("体重を入力してください");
      return;
    }
    createWeight(weight, date, handleChangeWeight);
    toast.success("登録しました");
  };

  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      <div className="flex justify-center gap-4 pt-5">
        <div className="pl-8 w-1/2 flex flex-col">
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
        <div className="pr-8 w-1/2 flex flex-col">
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
        <div className="w-40 h-10 mb-3">
          <Button
            onClick={() => {
              router.replace("/dashboard/weight/graph");
            }}
            type="button"
            variant="outlined"
          >
            体重推移
          </Button>
        </div>
        <div className="w-40 h-10 mb-3">
          <Button
            onClick={handleSave}
            type="button"
            variant="outlined"
            disabled={isSubmitting}
          >
            保存
          </Button>
        </div>
      </div>
    </>
  );
};
