import { useContext } from "react";
import { useState } from "react";
import useSWR from "swr";
import { UserContext } from "../../layout";
import { useApi } from "@/app/_hooks/useApi";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weight";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/weight/postRequest";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/weight/postResponse";

export const useWeights = () => {
  const [dbUserId] = useContext(UserContext);
  const { token, isLoding } = useSupabaseSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { post } = useApi();

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
    const resp = await fetch("/api/dashboard/weight", prams);
    const data: IndexResponse = await resp.json();
    if (data.status !== 200) {
      throw new Error(data.error);
    }
    return data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetchData ? "/api/dashboard/weight" : null,
    fetcher
  );
  const createWeight = async (
    weight: number,
    date: string,
    handleChangeWeight: (val: string) => void
  ) => {
    if (!dbUserId) return;
    setIsSubmitting(true);
    const prams = {
      data: {
        weight,
        measurementDate: new Date(date),
        createUser: dbUserId,
        changeUser: dbUserId,
      },
    };
    try {
      await post<PostRequests, PostResponse>("/api/dashboard/weight", prams);
      handleChangeWeight("");
      mutate();
    } catch (e) {
      alert("データの登録に失敗しました");
    }
    setIsSubmitting(false);
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    isSubmitting,
    createWeight,
  };
};
