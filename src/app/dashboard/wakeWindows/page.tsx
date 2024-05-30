"use client";

import { useContext, useEffect } from "react";
import { useState } from "react";
import { useGetWakeWindows } from "../_hooks/useGetWakeWindows";
import { UserContext } from "../layout";
import { Guideline } from "./_components/guideline";
import { useValidation } from "./_hooks/useValidation";
import { convertToMinutes } from "./_utils/convertToMinutes";
import { SubmitButton } from "@/app/_components/submitButton";
import { Input } from "@/app/_components/input";
import { IsLoading } from "@/app/_components/isLoading";
import { Label } from "@/app/_components/label";
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
  const [dbUserId, babyId] = useContext(UserContext);
  const { token, isLoding } = useSupabaseSession();
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
    if (
      getData &&
      "data" in getData &&
      getData.data !== null &&
      "sleepPrepTime" in getData.data
    ) {
      setData(getData.data);
      setting(getData.data);
    }
  }, [isLoading, getData, setting, isLoding]);
  if (isLoading || isLoding) return <IsLoading></IsLoading>;
  if (error) return <div>データの取得に失敗しました</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !babyId || !dbUserId) return;
    if (!data) {
      const wakeWindows: PostWakeWindows[] = [
        {
          babyId,
          type: "ALL",
          time: convertToMinutes(`${basicHour}時間${basicMinutes}分`),
          changeUser: dbUserId,
          createUser: dbUserId,
        },
        {
          babyId,
          type: "MORNING",
          time: convertToMinutes(`${morningHour}時間${morningMinutes}分`),
          changeUser: dbUserId,
          createUser: dbUserId,
        },
        {
          babyId,
          type: "NOON",
          time: convertToMinutes(`${afternoonHour}時間${afternoonMinutes}分`),
          changeUser: dbUserId,
          createUser: dbUserId,
        },
        {
          babyId,
          type: "EVENING",
          time: convertToMinutes(`${eveningHour}時間${eveningMinutes}分`),
          changeUser: dbUserId,
          createUser: dbUserId,
        },
      ];
      const sleepPrepTime: SleepPrepTime = {
        babyId,
        time: sinceBedtime,
        changeUser: dbUserId,
        createUser: dbUserId,
      };
      const prams = { wakeWindows, sleepPrepTime };

      try {
        await fetcher.post<PostRequests, ApiResponse>(
          "/api/dashboard/wakeWindows",
          prams
        );
        mutate();
      } catch (e) {
        alert("データの登録に失敗しました");
      }
    } else {
      const wakeWindows: PutWakeWindows[] = [];
      data.activityTime.map(item => {
        if (!item.id) return;
        switch (item.type) {
          case "ALL":
            wakeWindows.push({
              id: item.id,
              babyId,
              type: item.type,
              time: convertToMinutes(`${basicHour}時間${basicMinutes}分`),
              changeUser: dbUserId,
            });
            break;
          case "MORNING":
            wakeWindows.push({
              id: item.id,
              babyId,
              type: item.type,
              time: convertToMinutes(`${morningHour}時間${morningMinutes}分`),
              changeUser: dbUserId,
            });
            break;
          case "NOON":
            wakeWindows.push({
              id: item.id,
              babyId,
              type: item.type,
              time: convertToMinutes(
                `${afternoonHour}時間${afternoonMinutes}分`
              ),
              changeUser: dbUserId,
            });
            break;
          case "EVENING":
            wakeWindows.push({
              id: item.id,
              babyId,
              type: item.type,
              time: convertToMinutes(`${eveningHour}時間${eveningMinutes}分`),
              changeUser: dbUserId,
            });
            break;
        }
      });
      if (!data.sleepPrepTime.id) return;
      const sleepPrepTime = {
        id: data.sleepPrepTime.id,
        babyId,
        time: sinceBedtime,
        changeUser: dbUserId,
      };
      const prams = { wakeWindows, sleepPrepTime };

      try {
        await fetcher.put<UpdateRequests, ApiResponse>(
          "/api/dashboard/wakeWindows",
          prams
        );
        mutate();
      } catch (e) {
        alert("データ更新に失敗しました");
      }
    }
  };

  return (
    <>
      <h1 className="pt-5 text-center text-lg">活動時間設定</h1>
      <Guideline></Guideline>
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
              <Label text="基本の活動時間" htmlFor="basic"></Label>
              <div className="flex gap-1">
                <Input
                  id="basicHour"
                  type="text"
                  value={basicHour?.toString()}
                  placeholder="時間"
                  inputMode="numeric"
                  onChange={value => handleCahngeBasicHour(value)}
                ></Input>
                {basicHourError && <p>{basicHourError}</p>}{" "}
                <Input
                  id="basicMinutes"
                  type="text"
                  value={basicMinutes?.toString()}
                  placeholder="分"
                  inputMode="numeric"
                  onChange={value => handleCahngeBasicMinutes(value)}
                ></Input>
                {basicMinutesError && <p>{basicMinutesError}</p>}{" "}
              </div>
            </div>
            <div className="flex-1">
              <Label text="寝かしつけ開始(分前)" htmlFor="basic"></Label>
              <Input
                id="sinceBedtime"
                type="number"
                value={String(sinceBedtime)}
                placeholder="分前"
                inputMode="numeric"
                onChange={value => setSinceBedtime(Number(value))}
              ></Input>
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
                onChange={value => handleCahngeMorningHour(value)}
              />
              {morningHourError && <p>{morningHourError}</p>}{" "}
              <Input
                id="morningMinutes"
                type="text"
                value={morningMinutes?.toString()}
                placeholder="分"
                inputMode="numeric"
                onChange={value => handleCahngeMorningMinutes(value)}
              />
              {morningMinutesError && <p>{morningMinutesError}</p>}{" "}
            </div>
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
                onChange={value => handleCahngeAfternoonHour(value)}
              />
              {afternoonHourError && <p>{afternoonHourError}</p>}{" "}
              <Input
                id="afternoonMinutes"
                type="text"
                value={afternoonMinutes?.toString()}
                placeholder="分"
                inputMode="numeric"
                onChange={value => handleCahngeAfternoonMinutes(value)}
              />
            </div>
            {afternoonMinutesError && <p>{afternoonMinutesError}</p>}{" "}
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
                onChange={value => handleCahngeEveningHour(value)}
              />
              {eveningMinutesError && <p>{eveningHourError}</p>}{" "}
              <Input
                id="eveningMinutes"
                type="text"
                value={eveningMinutes?.toString()}
                placeholder="分"
                inputMode="numeric"
                onChange={value => handleCahngeEveningMinutes(value)}
              />
              {eveningMinutesError && <p>{eveningMinutesError}</p>}{" "}
            </div>
          </div>
        </div>
        <div className="text-center">
          <SubmitButton>保存</SubmitButton>
        </div>
      </form>
    </>
  );
}
