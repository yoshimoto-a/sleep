import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/advancedSetting";

export const useGetGrowth = () => {
  const { data, error, isLoading } =
    useFetch<IndexResponse>("/dashboard/growth");

  return { isLoading, data, error };
};
