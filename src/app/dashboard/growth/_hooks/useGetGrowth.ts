import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../layout";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/advancedSetting";

export const useGetGrowth = (): {
  getIsLoading: boolean;
  data: IndexResponse | null;
} => {
  const [, babyId] = useContext(UserContext);
  const { token, isLoding } = useSupabaseSession();
  const [getIsLoading, setGetIsLoading] = useState(false);
  const [data, setDate] = useState<IndexResponse | null>(null);

  useEffect(() => {
    if (isLoding || !babyId) return;
    const fetcher = async () => {
      if (!token) return;
      setGetIsLoading(true);
      const prams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const resp = await fetch(`/api/dashboard/growth?id=${babyId}`, prams);
      const data: IndexResponse = await resp.json();
      setDate(data);
      setGetIsLoading(false);
    };
    fetcher();
  }, [token, babyId, isLoding]);

  return { getIsLoading, data };
};
