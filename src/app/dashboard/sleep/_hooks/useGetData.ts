import { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "../../layout";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { SleepingSituationResponse } from "@/app/_types/apiRequests/dashboard/sleep";

export const useGetData = (date: Date) => {
  const { token, isLoding } = useSupabaseSession();
  const [, babyId] = useContext(UserContext);

  const fetcher = async () => {
    if (isLoding) return;
    if (!token || !babyId) {
      throw new Error("token or babyId not found");
    }
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
    `/api/dashboard?date=${date}`,
    fetcher
  );

  return { isLoading, data, error, mutate };
};
