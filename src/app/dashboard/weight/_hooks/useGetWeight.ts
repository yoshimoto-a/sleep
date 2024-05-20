import { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "../../layout";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weight";

export const useGetWeight = () => {
  const [dbUserId, babyId] = useContext(UserContext);
  const { token, isLoding } = useSupabaseSession();
  const shouldFetchData = !isLoding && token;
  const fetcher = async () => {
    if (!token || !babyId) return;
    const prams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const resp = await fetch(`/api/dashboard/weight?id=${babyId}`, prams);
    const data: IndexResponse = await resp.json();
    return data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetchData ? `/api/dashboard/weight?id=${babyId}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate, dbUserId, babyId };
};
