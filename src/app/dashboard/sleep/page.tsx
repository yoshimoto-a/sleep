"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useBaby } from "../_hooks/useBaby";
import { UserContext } from "../layout";
import { Button } from "./_component/button";
import { Header } from "./_component/header";
import { MainTime } from "./_component/mainTime";
import { RowItem } from "./_component/rowItem";
import { CustomModal } from "@/app/_components/modal";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { SleepingSituationResponse } from "@/app/_types/apiRequests/dashboard/sleep";
import { FormatedData } from "@/app/_types/apiRequests/dashboard/sleep";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/sleep/postResponse";

type Action = "bedTime" | "sleep" | "wakeup";

export default function Page() {
  const router = useRouter();
  const [dbUserId, babyId] = useContext(UserContext);
  const { token, session, isLoding } = useSupabaseSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<Action>("sleep");
  const [datetime, setDatetime] = useState(new Date());
  const [records, setRecords] = useState<FormatedData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const { birthday, isLoading: isBabyLoading } = useBaby({ babyId });

  const getRecords = async () => {
    setLoading(true);
    if (!token) return;
    const resp = await fetch(`/api/dashboard?date=${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data: SleepingSituationResponse = await resp.json();
    data.status !== 200 && alert(`一覧取得できませんでした。${data.message}`);
    if ("data" in data && data.data) {
      setRecords(data.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getRecords();
  }, [session, token, date]);
  if (isLoding || isLoading || isBabyLoading) return <div>Loading</div>;
  if (!session || !token) {
    router.push("/login/");
    return null;
  }

  //登録処理
  const handleClick = async (action: Action) => {
    setDatetime(new Date());
    setAction(action);
    setIsModalOpen(true);
  };

  const saveValue = async () => {
    modalClose();
    const resp = await fetch(`/api/dashboard/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        babyId,
        [action]: datetime,
        createUser: dbUserId,
      }),
    });
    const data: PostResponse = await resp.json();
    data.status !== 200
      ? alert(`登録できませんでした。${data.message}`)
      : getRecords();
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  const title = (): string => {
    switch (action) {
      case "bedTime":
        return "寝かしつけ開始";
      case "sleep":
        return "寝た";
      case "wakeup":
        return "起きた";
    }
  };

  const handlePrev = () => {
    setDate(dayjs(date).add(-1, "d").toDate());
  };

  const handleNext = () => {
    setDate(dayjs(date).add(1, "d").toDate());
  };

  return (
    <>
      <Header
        name="ベビー"
        birthday={birthday}
        date={date}
        onClickPrev={handlePrev}
        onClickNext={handleNext}
      ></Header>
      <div className="flex justify-between mx-10 my-5">
        <MainTime title="お勧めのねんね時刻" time="17:05" />
        <MainTime title="現在の活動時間" time="90分" />
      </div>
      <div className="grid grid-cols-10">
        <div className="bg-white col-span-3">グラフ</div>
        <div className="relative col-span-7 h-full">
          <div>
            {records.map((record, index) => {
              return (
                <RowItem
                  key={index}
                  id={record.id}
                  time={record.HourAndMinutes}
                  action={record.action}
                  interval={record.MinutesOnly}
                ></RowItem>
              );
            })}
          </div>
          <div className="absolute bottom-100 w-full px-3 py-1 bg-custom-blue flex justify-between items-center">
            <Button
              icon="/_buttonIcon/start.png"
              text="寝かしつけ開始"
              action="bedTime"
              onclick={() => handleClick("bedTime")}
            ></Button>
            <Button
              icon="/_buttonIcon/sleep.png"
              text="寝た"
              action="sleep"
              onclick={() => handleClick("sleep")}
            ></Button>
            <Button
              icon="/_buttonIcon/wakeUp.png"
              text="起きた"
              action="wakeup"
              onclick={() => handleClick("wakeup")}
            ></Button>
          </div>
        </div>
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
        >
          <h2 className="text-center">{title()}</h2>
          <input
            id="datetime"
            type="datetime-local"
            defaultValue={dayjs(new Date()).format("YYYY-MM-DDTHH:mm")}
            className="block p-2 m-5 border"
            onChange={(e) => setDatetime(new Date(e.target.value))}
          />
          <div className="w-full flex justify-between">
            <button
              onClick={modalClose}
              className="w-2/5 rounded bg-gray-300 px-4 py-2"
            >
              閉じる
            </button>
            <button
              onClick={saveValue}
              className="w-2/5 rounded bg-blue-500 px-4 py-2"
            >
              保存
            </button>
          </div>
        </CustomModal>
      </div>
    </>
  );
}
