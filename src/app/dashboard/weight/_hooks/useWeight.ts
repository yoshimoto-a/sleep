import dayjs from "dayjs";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../layout";
import { useApi } from "@/app/_hooks/useApi";
import { delRequests } from "@/app/_types/apiRequests/dashboard/weight/delReqests";
import { delResponse } from "@/app/_types/apiRequests/dashboard/weight/delResponse";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/weight/updateRequest";
import { UpdateResponse } from "@/app/_types/apiRequests/dashboard/weight/updateResponse";

export const useWeight = (
  id: number,
  initialWeight: number,
  initialDate: Date,
  mutate: any
) => {
  const [weight, setWeight] = useState<number>(initialWeight);
  const [weightError, setWeightError] = useState("");
  const [date, setDate] = useState(dayjs(initialDate).format("YYYY-MM-DD"));
  const [dbUserId, babyId] = useContext(UserContext);
  const fetcher = useApi();

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
  const put = async () => {
    try {
      if (!dbUserId || !weight || !date) return;
      const body = {
        id,
        data: {
          weight: weight,
          measurementDate: new Date(date),
          changeUser: dbUserId,
        },
      };
      await fetcher.put<UpdateRequests, UpdateResponse>(
        "/api/dashboard/weight",
        body
      );
      mutate(`/api/dashboard/weight?id=${babyId}`, body);
    } catch (e) {
      alert("更新に失敗しました");
    }
  };
  const del = async () => {
    try {
      await fetcher.del<delRequests, delResponse>(
        `/api/dashboard/weight?id=${id}`
      );
      mutate();
    } catch (e) {
      alert("削除に失敗しました");
    }
  };

  return {
    weight,
    weightError,
    date,
    handleChangeWeight,
    handleChangeDate,
    put,
    del,
  };
};
