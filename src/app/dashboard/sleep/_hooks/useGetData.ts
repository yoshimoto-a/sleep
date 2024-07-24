import { useFetch } from "@/app/_hooks/useFetch";
import { SleepingSituationResponse } from "@/app/_types/apiRequests/dashboard/sleep";

export const useGetData = (date: Date) => {
  const { isLoading, data, error, mutate } =
    useFetch<SleepingSituationResponse>(`dashboard?date=${date}`);

  return { isLoading, data, error, mutate };
};
