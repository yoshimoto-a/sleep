import { useContext, useState } from "react";
import useSWR from "swr";
import { UserContext } from "../../layout";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/advancedSetting";

export const useGetGrowth = (): {
  getIsLoading: boolean;
  data: IndexResponse | undefined;
  error: any;
} => {
  const [, babyId] = useContext(UserContext);
  const { token } = useSupabaseSession();
  const [getIsLoading, setGetIsLoading] = useState(false);

  const fetcher = async () => {
    if (!token || !babyId) return;
    const prams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const resp = await fetch(`/api/dashboard/growth?id=${babyId}`, prams);
    const data: IndexResponse = await resp.json();

    setGetIsLoading(true);
    return data;
  };
  const { data, error } = useSWR(`/api/dashboard/growth?id=${babyId}`, fetcher);

  return { getIsLoading, data, error };
};
