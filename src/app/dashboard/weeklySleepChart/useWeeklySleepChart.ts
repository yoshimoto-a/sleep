"use client";
import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weeklySleepChart";

export const useWeeklySleepChart = (date: Date) => {
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
    const resp = await fetch(
      `/api/dashboard/weeklySleepChart?date=${date}`,
      prams
    );
    const data: IndexResponse = await resp.json();
    if (data.status !== 200) {
      throw new Error(String(data));
    }
    return data;
  };
  const { data, error, isLoading } = useSWR(
    shouldFetchData ? `/api/dashboard/weeklySleepChart?date=${date}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
