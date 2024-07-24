"use client";

import { useState } from "react";
import { dayjs } from "../../../../utils/dayjs";
import { useGetData } from "./../_hooks/useGetData";

export const useSleepDashBoard = () => {
  const [date, setDate] = useState(new Date());
  const { isLoading, data, error, mutate } = useGetData(date);
  const handlePrev = () => {
    setDate(dayjs(date).add(-1, "d").toDate());
  };
  const handleNext = () => {
    setDate(dayjs(date).add(1, "d").toDate());
  };
  return { isLoading, data, error, mutate, handleNext, handlePrev, date };
};
