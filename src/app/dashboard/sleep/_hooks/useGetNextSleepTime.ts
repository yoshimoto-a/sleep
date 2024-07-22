import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";

export const useGetNextSleepTime = () => {
  const { data, error, isLoading, mutate } = useFetch<IndexResponse>(
    "dashboard/nextSleepTime"
  );

  return { isLoading, data, error, mutate };
};
