import { useWeightValidation } from "./useWeightValidation";
import { useApi } from "@/app/_hooks/useApi";
import { DelResponse } from "@/app/_types/apiRequests/dashboard/weight/DelResponse";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/weight/UpdateRequest";
import { UpdateResponse } from "@/app/_types/apiRequests/dashboard/weight/UpdateResponse";

export const useWeightForm = (
  id: number,
  initialWeight: number,
  initialDate: Date,
  mutate: any,
  setIsOpen: (isOpen: boolean) => void
) => {
  const { weight, weightError, date, handleChangeWeight, handleChangeDate } =
    useWeightValidation(initialWeight, initialDate);
  const fetcher = useApi();

  const put = async () => {
    try {
      if (!weight || !date) return;
      const body = {
        weight: weight,
        measurementDate: new Date(date),
      };
      await fetcher.put<UpdateRequests, UpdateResponse>(
        `/api/dashboard/weight/${id}`,
        body
      );
      mutate();
      setIsOpen(false);
    } catch (e) {
      alert("更新に失敗しました");
    }
  };
  const del = async () => {
    if (!confirm("削除していいですか？")) return;
    try {
      await fetcher.del<DelResponse>(`/api/dashboard/weight/${id}`);
      mutate();
      setIsOpen(false);
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
