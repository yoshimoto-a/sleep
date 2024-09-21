"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import { dayjs } from "../../../../utils/dayjs";
import { useGetData } from "./../_hooks/useGetData";
import { useSwiper } from "@/app/_hooks/useSwiper";

export const useSleepDashBoard = () => {
  const searchParams = useSearchParams();
  const currentDate = searchParams.get("date")
    ? new Date(searchParams.get("date") as string)
    : new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const { isLoading, data, error, mutate } = useGetData(selectedDate);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("date", selectedDate.toISOString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [selectedDate]);

  const handlePrev = useCallback(() => {
    const newDate = dayjs(selectedDate).add(-1, "d").toDate();
    setSelectedDate(newDate);
  }, [selectedDate]);
  const handleNext = useCallback(() => {
    const newDate = dayjs(selectedDate).add(1, "d").toDate();
    setSelectedDate(newDate);
  }, [selectedDate]);
  const { handleTouchEnd } = useSwiper(handleNext, handlePrev);

  return {
    isLoading,
    data,
    error,
    mutate,
    handleNext,
    handlePrev,
    date: selectedDate,
    setSelectedDate,
    handleTouchEnd,
  };
};
