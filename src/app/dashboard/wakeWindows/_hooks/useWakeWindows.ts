"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  convertToMinutes,
  convertMinutesToHoursAndMinutes,
} from ".././_utils/convertToMinutes";
import { useGetWakeWindows } from "../../_hooks/useGetWakeWindows";
import { useApi } from "@/app/_hooks/useApi";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { PostWakeWindows } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { SleepPrepTime } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { PutWakeWindows } from "@/app/_types/apiRequests/dashboard/wakeWindows/updateRequest";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows/updateRequest";
import { WakeWindowsData } from "@/app/_types/dashboard/wakeWindowsData";
type FormInputs = {
  basicHour: string;
  basicMinutes: string;
  morningHour: string;
  morningMinutes: string;
  afternoonHour: string;
  afternoonMinutes: string;
  eveningHour: string;
  eveningMinutes: string;
  sinceBedtime: number;
};
export const useWakeWindows = () => {
  const router = useRouter();
  const {
    wakeWindowsData,
    error: wakeWindowsError,
    isLoading,
    mutate,
  } = useGetWakeWindows();
  const [data, setData] = useState<WakeWindowsData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetcher = useApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      basicHour: "0",
      basicMinutes: "0",
      morningHour: "0",
      morningMinutes: "0",
      afternoonHour: "0",
      afternoonMinutes: "0",
      eveningHour: "0",
      eveningMinutes: "0",
      sinceBedtime: 0,
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isLoading) return;
    if (!wakeWindowsData) return;
    if (wakeWindowsData.data) {
      setData(wakeWindowsData.data);
      const allTime = convertMinutesToHoursAndMinutes(
        wakeWindowsData.data.activityTime.find(item => item.type === "ALL")
          ?.time || 0
      );
      const morningTime = convertMinutesToHoursAndMinutes(
        wakeWindowsData.data.activityTime.find(item => item.type === "MORNING")
          ?.time || 0
      );
      const noonTime = convertMinutesToHoursAndMinutes(
        wakeWindowsData.data.activityTime.find(item => item.type === "NOON")
          ?.time || 0
      );
      const eveningTime = convertMinutesToHoursAndMinutes(
        wakeWindowsData.data.activityTime.find(item => item.type === "EVENING")
          ?.time || 0
      );
      reset({
        basicHour: allTime.hours.toString(),
        basicMinutes: allTime.mins.toString(),
        morningHour: morningTime.hours.toString(),
        morningMinutes: morningTime.mins.toString(),
        afternoonHour: noonTime.hours.toString(),
        afternoonMinutes: noonTime.mins.toString(),
        eveningHour: eveningTime.hours.toString(),
        eveningMinutes: eveningTime.mins.toString(),
        sinceBedtime: wakeWindowsData.data.sleepPrepTime.time,
      });
    }
  }, [isLoading, wakeWindowsData, reset, mutate]);

  const onSubmit = async (inputData: FormInputs) => {
    setIsSubmitting(true);
    const toastId = toast.loading("保存処理中...");
    try {
      if (!data) {
        const wakeWindows: PostWakeWindows[] = [
          {
            type: "ALL",
            time: convertToMinutes(
              `${inputData.basicHour}時間${inputData.basicMinutes}分`
            ),
          },
          {
            type: "MORNING",
            time: convertToMinutes(
              `${inputData.morningHour}時間${inputData.morningMinutes}分`
            ),
          },
          {
            type: "NOON",
            time: convertToMinutes(
              `${inputData.afternoonHour}時間${inputData.afternoonMinutes}分`
            ),
          },
          {
            type: "EVENING",
            time: convertToMinutes(
              `${inputData.eveningHour}時間${inputData.eveningMinutes}分`
            ),
          },
        ];
        const sleepPrepTime: SleepPrepTime = {
          time: Number(inputData.sinceBedtime),
        };
        const prams = { wakeWindows, sleepPrepTime };
        await fetcher.post<PostRequests, ApiResponse>(
          "/api/dashboard/wakeWindows",
          prams
        );
        mutate();
        toast.success("保存しました");
        router.replace("/dashboard/sleep");
      } else {
        const wakeWindows: PutWakeWindows[] = [];
        data.activityTime.map(item => {
          if (!item.id) {
            throw new Error("activityTimeのIDなし");
          }
          switch (item.type) {
            case "ALL":
              wakeWindows.push({
                id: item.id,
                type: item.type,
                time: convertToMinutes(
                  `${inputData.basicHour}時間${inputData.basicMinutes}分`
                ),
              });
              break;
            case "MORNING":
              wakeWindows.push({
                id: item.id,
                type: item.type,
                time: convertToMinutes(
                  `${inputData.morningHour}時間${inputData.morningMinutes}分`
                ),
              });
              break;
            case "NOON":
              wakeWindows.push({
                id: item.id,
                type: item.type,
                time: convertToMinutes(
                  `${inputData.afternoonHour}時間${inputData.afternoonMinutes}分`
                ),
              });
              break;
            case "EVENING":
              wakeWindows.push({
                id: item.id,
                type: item.type,
                time: convertToMinutes(
                  `${inputData.eveningHour}時間${inputData.eveningMinutes}分`
                ),
              });
              break;
          }
        });
        if (!data.sleepPrepTime.id) {
          throw new Error("sleepPrepTimeのidなし");
        }
        const sleepPrepTime = {
          id: data.sleepPrepTime.id,
          time: Number(inputData.sinceBedtime),
        };
        const prams = { wakeWindows, sleepPrepTime };
        await fetcher.put<UpdateRequests, ApiResponse>(
          "/api/dashboard/wakeWindows",
          prams
        );
        mutate();
        toast.success("保存しました");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(`保存に失敗しました。${e.message}`);
      }
    } finally {
      toast.dismiss(toastId);
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
    wakeWindowsError,
    isLoading,
    register,
    errors,
    isOpen,
    setIsOpen,
  };
};
