import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/sleepDetail/IndexResponse";

export const useGetDataById = (id: number) => {
  const { token, isLoding } = useSupabaseSession();
  const shouldFetchData = !isLoding && token;
  const fetcher = async () => {
    if (!token) return;
    const resp = await fetch(`/api/dashboard/sleepDetail?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data: IndexResponse = await resp.json();
    if (data.status !== 200) {
      throw new Error("error in fetcher");
    }
    return data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetchData ? `/api/dashboard/sleepDetail?id=${id}` : null,
    fetcher
  );

  return { isLoading, data, error, mutate };
};
