import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/wakeWindows";

export const useGetWakeWindows = () => {
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
      const resp = await fetch("/api/dashboard/wakeWindows", prams);
      const data: IndexResponse = await resp.json();
      if (resp.status === 204) {
        throw { status: 204, error: "record not found" };
      }
      if (data.status !== 200) {
        throw data;
      }
      return data;
    }
  };
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetchData ? "/api/dashboard/wakeWindows" : null,
    fetcher
  );

  return { isLoading, data, error, mutate };
};
