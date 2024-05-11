"use client";

import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../layout";
import { useValidation } from "./_hooks/useValidation";
import { convertToMinutes } from "./_utils/convertToMinutes";
import { SubmitButton } from "@/app/_components/button";
import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/wakeWindows";
import { WakeWindows } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { SleepPrepTime } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { WakeWindows as PutWakeWindows } from "@/app/_types/apiRequests/dashboard/wakeWindows/updateRequest";
import { SleepPrepTime as PutSleePrepTime } from "@/app/_types/apiRequests/dashboard/wakeWindows/updateRequest";

export interface Data {
  activityTime: WakeWindows[];
  sleepPrepTime: SleepPrepTime;
}
export default function Page() {
  const [data, setData] = useState<Data | null>(null);
  const [dbUserId, babyId] = useContext(UserContext);
  const { token } = useSupabaseSession();
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

  //初期設定
  useEffect(() => {
    if (token && babyId) {
      const fethcer = async () => {
        const resp = await fetch(`/api/dashboard/wakeWindows?id=${babyId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const jsonData = await resp.json();
        const data: IndexResponse = jsonData;
        if (data.status !== 200) {
          alert("データの取得に失敗しました");
          return;
        }
        if (
          "data" in data &&
          data.data !== null &&
          "sleepPrepTime" in data.data
        ) {
          setData(data.data);
          setting(data.data);
        }
      };
      fethcer();
    }
  }, [token, babyId, setting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !babyId || !dbUserId) return;
    if (!data) {
      const method = "POST";
      const wakeWindows: WakeWindows[] = [
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
      const prams = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: { wakeWindows, sleepPrepTime },
      };
      const postResp = await fetch("/api/dashboard/wakeWindows", {
        ...prams,
        body: JSON.stringify(prams.body),
      });
      const resp = await postResp.json();
    } else {
      const method = "PUT";
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
      const sleepPrepTime: PutSleePrepTime = {
        id: data.sleepPrepTime.id,
        babyId,
        time: sinceBedtime,
        changeUser: dbUserId,
      };
      const prams = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: { wakeWindows, sleepPrepTime },
      };
      const postResp = await fetch("/api/dashboard/wakeWindows", {
        ...prams,
        body: JSON.stringify(prams.body),
      });
      const resp = await postResp.json();
      console.log(resp);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-6">詳細設定</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-custom-gray shadow-md rounded px-8 pt-6 pb-8 my-4"
      >
        <div className="flex flex-col">
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
              <Label text="寝かしつけ開始は何分前？" htmlFor="basic"></Label>
              <Input
                id="sinceBedtime"
                type="number"
                value={String(sinceBedtime)}
                placeholder=""
                inputMode="numeric"
                onChange={value => setSinceBedtime(Number(value))}
              ></Input>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>活動時間詳細設定</h2>
          <p className="mb-5">詳細登録がある場合、詳細の内容が優先されます</p>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label text="朝寝(7時～11時)" htmlFor="morning" />
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
            <Label text="昼寝(11時～15時)" htmlFor="afternoon" />
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
            <Label text="夕寝(15時～18時)" htmlFor="evening" />
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
