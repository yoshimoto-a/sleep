import dayjs from "dayjs";
import { useState } from "react";

export const useWeightValidation = () => {
  const [weight, setWeight] = useState<number | null>(null);
  const [weightError, setWeightError] = useState("");
  const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));

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
