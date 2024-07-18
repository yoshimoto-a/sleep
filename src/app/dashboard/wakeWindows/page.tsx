"use client";

import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useGetWakeWindows } from "../_hooks/useGetWakeWindows";
import { Guideline } from "./_components/guideline";
import { useValidation } from "./_hooks/useValidation";
import { convertToMinutes } from "./_utils/convertToMinutes";
import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";
import { SubmitButton } from "@/app/_components/submitButton";
import { useApi } from "@/app/_hooks/useApi";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { PostWakeWindows } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { SleepPrepTime } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { PutWakeWindows } from "@/app/_types/apiRequests/dashboard/wakeWindows/updateRequest";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows/updateRequest";
import { WakeWindowsData } from "@/app/_types/dashboard/wakeWindowsData";

export default function Page() {
  const { data: getData, error, isLoading, mutate } = useGetWakeWindows();
  const [data, setData] = useState<WakeWindowsData | null>(null);
  const { token, isLoding } = useSupabaseSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetcher = useApi();
  const {
    basicHour,
    basicMinutes,
    basicMinutesError,
    basicHourError,
    morningHour,
    morningHourError,
    morningMinutes,
    morningMinutesError,
    afternoonHour,
    afternoonHourError,
    afternoonMinutes,
    afternoonMinutesError,
    eveningHour,
    eveningHourError,
    eveningMinutes,
    eveningMinutesError,
    sinceBedtime,
    setSinceBedtime,
    handleCahngeAfternoonHour,
    handleCahngeAfternoonMinutes,
    handleCahngeBasicHour,
    handleCahngeBasicMinutes,
    handleCahngeEveningHour,
    handleCahngeMorningHour,
    handleCahngeMorningMinutes,
    handleCahngeEveningMinutes,
    setting,
  } = useValidation();

  useEffect(() => {
    if (isLoading) return;
    if (getData) {
      setData(getData.data);
      setting(getData.data);
    }
  }, [isLoading, getData, setting]);
  if (isLoading || isLoding) return;

  if (error && error?.status !== 204)
    return <div>データの取得に失敗しました</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    setIsSubmitting(true);
    const toastId = toast.loading("保存処理中...");
    try {
      if (!data) {
        const wakeWindows: PostWakeWindows[] = [
          {
            type: "ALL",
            time: convertToMinutes(`${basicHour}時間${basicMinutes}分`),
          },
          {
            type: "MORNING",
            time: convertToMinutes(`${morningHour}時間${morningMinutes}分`),
          },
          {
            type: "NOON",
            time: convertToMinutes(`${afternoonHour}時間${afternoonMinutes}分`),
          },
          {
            type: "EVENING",
            time: convertToMinutes(`${eveningHour}時間${eveningMinutes}分`),
          },
        ];
        const sleepPrepTime: SleepPrepTime = {
          time: sinceBedtime,
        };
        const prams = { wakeWindows, sleepPrepTime };

        await fetcher.post<PostRequests, ApiResponse>(
          "/api/dashboard/wakeWindows",
          prams
        );
        mutate();
        toast.success("保存しました");
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
                time: convertToMinutes(`${basicHour}時間${basicMinutes}分`),
              });
              break;
            case "MORNING":
              wakeWindows.push({
                id: item.id,
                type: item.type,
                time: convertToMinutes(`${morningHour}時間${morningMinutes}分`),
              });
              break;
            case "NOON":
              wakeWindows.push({
                id: item.id,
                type: item.type,
                time: convertToMinutes(
                  `${afternoonHour}時間${afternoonMinutes}分`
                ),
              });
              break;
            case "EVENING":
              wakeWindows.push({
                id: item.id,
                type: item.type,
                time: convertToMinutes(`${eveningHour}時間${eveningMinutes}分`),
              });
              break;
          }
        });
        if (!data.sleepPrepTime.id) {
          throw new Error("sleepPrepTimeのidなし");
        }
        const sleepPrepTime = {
          id: data.sleepPrepTime.id,
          time: sinceBedtime,
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
      console.log(e);
      toast.error("保存に失敗しました");
    } finally {
      toast.dismiss(toastId);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="pt-10 text-center text-lg">活動時間設定</h1>
      <div>
        <Toaster position="top-center" />
      </div>
      <Guideline />
      <form
        onSubmit={handleSubmit}
        className="bg-custom-gray shadow-md rounded px-4 pt-6 pb-8 my-4"
      >
        <div className="flex flex-col">
          <div className="flex flex-row text-red-600 bg-slate-50 mb-2 p-3">
            <div className="flex items-center justify-center mr-1">※</div>
            <p className="text-sm p-1">
              終日一定の活動時間の場合や、お昼寝が1回の場合は基本のみ登録してください
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label text="基本の活動時間" htmlFor="basic" />
              <div className="flex gap-1">
                <Input
                  id="basicHour"
                  type="text"
                  value={basicHour?.toString()}
                  placeholder="時間"
                  inputMode="numeric"
                  disabled={isSubmitting}
                  onChange={value => handleCahngeBasicHour(value)}
                />
                <Input
                  id="basicMinutes"
                  type="text"
                  value={basicMinutes?.toString()}
                  placeholder="分"
                  inputMode="numeric"
                  disabled={isSubmitting}
                  onChange={value => handleCahngeBasicMinutes(value)}
                />
              </div>
              {basicHourError || basicMinutesError ? (
                <p>{basicHourError || basicMinutesError}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex-1">
              <Label text="寝かしつけ開始(分前)" htmlFor="basic" />
              <Input
                id="sinceBedtime"
                type="number"
                value={String(sinceBedtime)}
                placeholder="分前"
                inputMode="numeric"
                disabled={isSubmitting}
                onChange={value => setSinceBedtime(Number(value))}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>活動時間詳細設定</h2>
          <span className="text-sm pb-3">
            登録がある場合、計算は時間帯別に行われます。
          </span>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label text="朝寝(7~11時)" htmlFor="morning" />
            <div className="flex gap-1">
              <Input
                id="morningHour"
                type="text"
                value={morningHour?.toString()}
                placeholder="時間"
                inputMode="numeric"
                disabled={isSubmitting}
                onChange={value => handleCahngeMorningHour(value)}
              />
              <Input
                id="morningMinutes"
                type="text"
                value={morningMinutes?.toString()}
                placeholder="分"
                inputMode="numeric"
                disabled={isSubmitting}
                onChange={value => handleCahngeMorningMinutes(value)}
              />
            </div>
            {morningHourError || morningMinutesError ? (
              <p>{morningHourError || morningMinutesError}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex-1">
            <Label text="昼寝(11~15時)" htmlFor="afternoon" />
            <div className="flex gap-1">
              <Input
                id="afternoonHour"
                type="text"
                value={afternoonHour?.toString()}
                placeholder="時間"
                inputMode="numeric"
                disabled={isSubmitting}
                onChange={value => handleCahngeAfternoonHour(value)}
              />
              <Input
                id="afternoonMinutes"
                type="text"
                value={afternoonMinutes?.toString()}
                placeholder="分"
                inputMode="numeric"
                disabled={isSubmitting}
                onChange={value => handleCahngeAfternoonMinutes(value)}
              />
            </div>
            {afternoonHourError || afternoonMinutesError ? (
              <p>{afternoonHourError || afternoonMinutesError}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex-1">
            <Label text="夕寝(15~18時)" htmlFor="evening" />
            <div className="flex gap-1">
              <Input
                id="eveningHour"
                type="text"
                value={eveningHour?.toString()}
                placeholder="時間"
                inputMode="numeric"
                disabled={isSubmitting}
                onChange={value => handleCahngeEveningHour(value)}
              />
              <Input
                id="eveningMinutes"
                type="text"
                value={eveningMinutes?.toString()}
                placeholder="分"
                inputMode="numeric"
                disabled={isSubmitting}
                onChange={value => handleCahngeEveningMinutes(value)}
              />
            </div>
            {eveningMinutesError || eveningHourError ? (
              <p>{eveningMinutesError || eveningHourError}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="text-center">
          <SubmitButton disabled={isSubmitting}>保存</SubmitButton>
        </div>
      </form>
    </>
  );
}
