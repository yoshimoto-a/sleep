import { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "../layout";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/wakeWindows";

export const useGetWakeWindows = () => {
  const [, babyId] = useContext(UserContext);
  const { token, isLoding } = useSupabaseSession();
  const shouldFetchData = !isLoding && token;
  const fetcher = async () => {
    if (token && babyId) {
      const prams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const resp = await fetch(
        `/api/dashboard/wakeWindows?id=${babyId}`,
        prams
      );
      const data: IndexResponse = await resp.json();
      return data;
    }
  };
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetchData ? `/api/dashboard/wakeWindows?id=${babyId}` : null,
    fetcher
  );

  return { isLoading, data, error, mutate };
};
