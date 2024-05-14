import { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "../layout";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/wakeWindows";

export const useGetWakeWindows = (): {
  isLoading: boolean;
  data: IndexResponse | undefined;
  error: any;
  mutate: any;
} => {
  const [, babyId] = useContext(UserContext);
  const { token } = useSupabaseSession();

  const fetcher = async () => {
    if (!token || !babyId) return;
    const prams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const resp = await fetch(`/api/dashboard/wakeWindows?id=${babyId}`, prams);
    const data: IndexResponse = await resp.json();

    return data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    `/api/dashboard/wakeWindows?id=${babyId}`,
    fetcher
  );

  return { isLoading, data, error, mutate };
};
