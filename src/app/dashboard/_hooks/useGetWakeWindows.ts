import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/wakeWindows";

export const useGetWakeWindows = () => {
  const { data, error, isLoading, mutate } = useFetch<IndexResponse>(
    "dashboard/wakeWindows"
  );
  console.log;
  return {
    isLoading,
    wakeWindowsData: data,
    error,
    mutate,
  };
};
