import { useEffect, useState } from "react";
import useSWR from "swr";
import { GetBaby } from "../setting/_utils/getBaby";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";

export const useBaby = ({ babyId }: { babyId: number | null }) => {
  const [baby, setBaby] = useState<IndexResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, session } = useSupabaseSession();
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetcher = async () => {
      if (!token || !babyId) return;
      try {
        const resp = await GetBaby(token, babyId);
        if ("data" in resp && resp.data !== null) {
          const { data } = resp;
          setName(data.name);
          setBirthday(data.birthday);
          setWeight(data.birthWeight);
          setBaby(resp);
        } else {
          throw new Error("");
        }
        setIsLoading(false);
      } catch (e) {
        alert("赤ちゃんの情報取得取得が出来ませんでした");
      }
    };
    fetcher();
  }, [babyId, token, session]);

  return { name, birthday, weight, baby, isLoading };
};

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
