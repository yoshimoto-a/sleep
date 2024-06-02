import { useContext } from "react";
import { UserContext } from "../../layout";
import { useWeightValidation } from "./useWeightValidation";
import { useApi } from "@/app/_hooks/useApi";
import { DelRequests } from "@/app/_types/apiRequests/dashboard/weight/DelReqests";
import { DelResponse } from "@/app/_types/apiRequests/dashboard/weight/DelResponse";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/weight/UpdateRequest";
import { UpdateResponse } from "@/app/_types/apiRequests/dashboard/weight/UpdateResponse";

export const useWeightForm = (
  id: number,
  initialWeight: number,
  initialDate: Date,
  mutate: any
) => {
  const { weight, weightError, date, handleChangeWeight, handleChangeDate } =
    useWeightValidation(initialWeight, initialDate);
  const [dbUserId, babyId] = useContext(UserContext);
  const fetcher = useApi();

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
      await fetcher.del<DelRequests, DelResponse>(
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
