import { useEffect, useState } from "react";
import { GetBaby } from "../_utils/getBaby";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";

export const useBaby = ({ babyId }) => {
  const [baby, setBaby] = useState<IndexResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const token = await hoge();
      try {
        const data = await GetBaby(token, babyId);
        setBaby(data);
        setIsLoading(false);
      } catch (e) {}
    };
    fetcher();
  }, [token, session]);

  const updateBaby = async (babyId, body) => {
    console.log("update!");
    setBaby(hoge)
  };

  return { baby, isLoading, updateBaby };
};

const { baby, isLoading, updateBaby } = useBaby({ babyId: 1 });

await updateBaby(1, { name: "hoge" });
