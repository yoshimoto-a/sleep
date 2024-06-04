import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { SleepingSituationResponse } from "@/app/_types/apiRequests/dashboard/sleep";

export const useGetData = (date: Date) => {
  const { token, isLoding } = useSupabaseSession();
  const shouldFetchData = !isLoding && token;
  const fetcher = async () => {
    if (!token) return;
    const resp = await fetch(`/api/dashboard?date=${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data: SleepingSituationResponse = await resp.json();
    if (data.status !== 200) {
      throw new Error("error in fetcher");
    }
    return data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetchData ? `/api/dashboard?date=${date}` : null,
    fetcher
  );

  return { isLoading, data, error, mutate };
};
