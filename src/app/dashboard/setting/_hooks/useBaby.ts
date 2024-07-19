"use client";

import { Gender } from "@prisma/client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { useGetBaby } from "../../_hooks/useGetBaby";
import { useGetWakeWindows } from "../../_hooks/useGetWakeWindows";
import { useApi } from "@/app/_hooks/useApi";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";

export const useBaby = () => {
  const { token, isLoding } = useSupabaseSession();
  const { data, isLoading, error } = useGetBaby();
  const [babyName, setBabyName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [expectedDateOfBirth, setExpectedDateOfBirth] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error: wakeWindowsError } = useGetWakeWindows();
  const { put } = useApi();
  //初期設定
  useEffect(() => {
    if (data && "data" in data) {
      const { data: babyData } = data;
      setBabyName(babyData.name);
      setBirthWeight(babyData.birthWeight.toString());
      setBirthday(dayjs(babyData.birthday).format("YYYY-MM-DD"));
      setExpectedDateOfBirth(
        String(dayjs(babyData.expectedDateOfBirth).format("YYYY-MM-DD"))
      );
      setGender(babyData.gender);
    }
  }, [isLoding, data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (token && gender) {
      try {
        const body = {
          name: babyName,
          birthday: dayjs(birthday).toDate(),
          expectedDateOfBirth: dayjs(expectedDateOfBirth).toDate(),
          birthWeight: parseInt(birthWeight),
          gender,
        };
        const resp = await put<UpdateRequests, ApiResponse>(
          "/api/dashboard/setting",
          body
        );
        if (wakeWindowsError?.status === 204) {
          router.replace("/dashboard/wakeWindows");
          return;
        }

        if (resp.status !== 200) {
          throw new Error("更新に失敗しました。");
        }

        router.replace("/dashboard/sleep/");
        return;
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
  };
};
