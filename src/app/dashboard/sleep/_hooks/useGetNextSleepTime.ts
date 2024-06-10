import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";

export const useGetNextSleepTime = () => {
  const { token, isLoding } = useSupabaseSession();
  const shouldFetchData = !isLoding && token;
  const fetcher = async () => {
    if (!token) return;
    const prams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const resp = await fetch("/api/dashboard/nextSleepTime", prams);
    const data: IndexResponse = await resp.json();

    if (data.status === 200 || data.error === "no wakeWindowsData") {
      return data;
    } else {
      throw new Error("error in fetcher");
    }
  };
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetchData ? "/api/dashboard/nextSleepTime" : null,
    fetcher
  );

  return { isLoading, data, error, mutate };
};
