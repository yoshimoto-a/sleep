"use client";

import { Gender } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { dayjs } from "../../../../utils/dayjs";
import { useGetBaby } from "../../_hooks/useGetBaby";
import { useGetWakeWindows } from "../../_hooks/useGetWakeWindows";
import { useValidation } from "./useValidation";
import { useApi } from "@/app/_hooks/useApi";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";

export const useBaby = () => {
  const { data, isLoading, error } = useGetBaby();
  const [babyName, setBabyName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [expectedDateOfBirth, setExpectedDateOfBirth] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const { errors, validate } = useValidation(
    babyName,
    birthday,
    expectedDateOfBirth,
    birthWeight,
    gender
  );
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { wakeWindowsData } = useGetWakeWindows();
  const { put } = useApi();

  useEffect(() => {
    if (isLoading) return;
    if (data) {
      const { data: babyData } = data;
      setBabyName(babyData.name);
      setBirthWeight(babyData.birthWeight.toString());
      setBirthday(dayjs(babyData.birthday).format("YYYY-MM-DD"));
      setExpectedDateOfBirth(
        String(dayjs(babyData.expectedDateOfBirth).format("YYYY-MM-DD"))
      );
      setGender(babyData.gender);
    }
  }, [data, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) return;
    setIsSubmitting(true);
    if (gender) {
      try {
        const body = {
          name: babyName,
          birthday: dayjs(birthday).toDate(),
          expectedDateOfBirth: dayjs(expectedDateOfBirth).toDate(),
          birthWeight: parseInt(birthWeight),
          gender,
        };
        await put<UpdateRequests, ApiResponse>("/api/dashboard/setting", body);
        if (wakeWindowsData?.status === 204) {
          router.replace("/dashboard/wakeWindows");
          return;
        } else {
          router.replace("/dashboard/sleep/");
          return;
        }
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        }
      }
    }
    setIsSubmitting(false);
  };
  return {
    isSubmitting,
    isLoading,
    error,
    handleSubmit,
    babyName,
    setBabyName,
    birthday,
    setBirthday,
    expectedDateOfBirth,
    setExpectedDateOfBirth,
    birthWeight,
    setBirthWeight,
    gender,
    setGender,
    errors,
  };
};
