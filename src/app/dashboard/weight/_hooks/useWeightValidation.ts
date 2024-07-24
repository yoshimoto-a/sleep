import { useState } from "react";
import { dayjs } from "../../../../utils/dayjs";

export const useWeightValidation = (
  initialWeight: number | null,
  initialDate: Date
) => {
  const [weight, setWeight] = useState<number | null>(initialWeight);
  const [weightError, setWeightError] = useState("");
  const [date, setDate] = useState(dayjs(initialDate).format("YYYY-MM-DD"));

  const handleChangeWeight = (val: string) => {
    if (isNaN(Number(val))) {
      setWeightError("数値を入力してください");
      setWeight(Number(val));
    } else {
      setWeightError("");
      setWeight(Number(val));
    }
  };
  const handleChangeDate = (val: string) => {
    setDate(val);
  };

  return {
    weight,
    weightError,
    date,
    handleChangeWeight,
    handleChangeDate,
  };
};
