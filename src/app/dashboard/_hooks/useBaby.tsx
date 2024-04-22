import { useEffect, useState } from "react";
import { GetBaby } from "../setting/_utils/getBaby";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export const useBaby = ({ babyId }: { babyId: number }) => {
  const [baby, setBaby] = useState<IndexResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, session } = useSupabaseSession();
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [weight, setWeight] = useState<number | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      if (!token || !babyId) return;
      try {
        const resp = await GetBaby(token, babyId);
        if ("data" in resp && resp.data !== null) {
          const { data } = resp;
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

  return { birthday, weight, baby, isLoading };
};
