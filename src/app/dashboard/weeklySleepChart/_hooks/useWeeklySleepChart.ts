"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weeklySleepChart";
export const useWeeklySleepChart = (date: Date) => {
  const { data, error, isLoading } = useFetch<IndexResponse>(
    `/dashboard/weekly_sleep_chart?date=${date}`
  );
  return {
    chartData: data?.chartData,
    keyname: data?.keyname,
    totalSleepTimeAverage: data?.totalSleepTimeAverage,
    error,
    isLoading,
  };
};
