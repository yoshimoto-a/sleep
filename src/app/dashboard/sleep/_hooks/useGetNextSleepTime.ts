import { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "../../layout";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";

export const useGetNextSleepTime = () => {
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
    const resp = await fetch("/api/dashboard/nextSleepTime", prams);
    const data: IndexResponse = await resp.json();
    if (data.status !== 200) {
      throw new Error("error in fetcher");
    }
    return data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    "/api/dashboard/nextSleepTime",
    fetcher
  );

  return { isLoading, data, error, mutate };
};
