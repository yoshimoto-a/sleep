import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/advancedSetting";

export const useGetGrowth = () => {
  const { token, isLoding } = useSupabaseSession();
  const shouldFetchData = !isLoding && token;
  const fetcher = async () => {
    if (token) {
      const prams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const resp = await fetch("/api/dashboard/growth", prams);
      const data: IndexResponse = await resp.json();
      return data;
    }
  };
  const { data, error, isLoading } = useSWR(
    shouldFetchData ? "/api/dashboard/growth" : null,
    fetcher
  );
  return { isLoading, data, error };
};
