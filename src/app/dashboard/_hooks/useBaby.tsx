import { useEffect, useState } from "react";
import { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "../layout";
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

export const useGetBaby = (): {
  isLoading: boolean;
  data: IndexResponse | undefined;
  error: any;
} => {
  const [, babyId] = useContext(UserContext);
  const { token } = useSupabaseSession();

  const fetcher = async () => {
    if (token && babyId) {
      const prams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const resp = await fetch(`/api/dashboard/setting?id=${babyId}`, prams);
      const data: IndexResponse = await resp.json();
      return data;
    }
  };
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/dashboard/setting?id=${babyId}`,
    fetcher
  );

  return { isLoading, data, error };
};
