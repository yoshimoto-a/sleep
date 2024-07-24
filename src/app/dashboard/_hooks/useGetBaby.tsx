import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";

export const useGetBaby = () => {
  const { data, isLoading, error } =
    useFetch<IndexResponse>("dashboard/setting");
  return { isLoading, data, error };
};
