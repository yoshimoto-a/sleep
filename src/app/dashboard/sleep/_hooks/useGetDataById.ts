"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/sleepDetail/IndexResponse";

export const useGetDataById = (id: number) => {
  const { isLoading, data, error, mutate } = useFetch<IndexResponse>(
    `dashboard/sleepDetail?id=${id}`
  );

  return { isLoading, data, error, mutate };
};
