import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";

export const useGetBaby = () => {
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
    const resp = await fetch(`/api/dashboard/setting`, prams);
    const data: IndexResponse = await resp.json();
    if (data.status !== 200) {
      throw new Error("Failed to get data");
    }
    return data;
  };
  const { data, error, isLoading } = useSWR(
    shouldFetchData ? `/api/dashboard/setting` : null,
    fetcher
  );

  return { isLoading, data, error };
};
