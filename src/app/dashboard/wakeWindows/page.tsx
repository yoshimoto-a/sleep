"use client";

import { useState, useEffect } from "react";
import { SubmitButton } from "@/app/_components/button";
import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";
// import { PostRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows";

export default function Page() {
  const [basicHour, setBasicHour] = useState<string>("");
  const [basicMinutes, setBasicMinutes] = useState<string>("");
  const [basicMinutesError, setBasicMinutesError] = useState<string>("");
  const [basicHourError, setBasicHourError] = useState<string>("");
  const [morningHour, setMorningHour] = useState<string>("");
  const [morningHourError, setMorningHourError] = useState<string>("");
  const [morningMinutes, setMorningMinutes] = useState<string>("");
  const [morningMinutesError, setMorningMinutesError] = useState<string>("");
  const [afternoonHour, setAfternoonHour] = useState<string>("");
  const [afternoonHourError, setAfternoonHourError] = useState<string>("");
  const [afternoonMinutes, setAfternoonMinutes] = useState<string>("");
  const [afternoonMinutesError, setAfternoonMinutesError] =
    useState<string>("");
  const [eveningHour, setEveningHour] = useState<string>("");
  const [eveningHourError, setEveningHourError] = useState<string>("");
  const [eveningMinutes, setEveningMinutes] = useState<string>("");
  const [eveningMinutesError, setEveningMinutesError] = useState<string>("");
  const [sinceBedtime, setSinceBedtime] = useState<number | null>(null);

  //初期設定
  useEffect(() => {});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      data: {},
    };
  };

  const handleCahngeBasicHour = (val: string) => {
    setBasicHour(val);
    if (isNaN(Number(val))) {
      setBasicHourError("数値を入力してください");
    } else {
      setBasicHourError("");
    }
  };
  const handleCahngeBasicMinutes = (val: string) => {
    setBasicMinutes(val);
    if (isNaN(Number(val))) {
      setBasicMinutesError("数値を入力してください");
    } else {
      setBasicMinutesError("");
    }
  };
  const handleCahngeMorningHour = (val: string) => {
    setMorningHour(val);
    if (isNaN(Number(val))) {
      setMorningHourError("数値を入力してください");
    } else {
      setMorningHourError("");
    }
  };
  const handleCahngeMorningMinutes = (val: string) => {
    setMorningMinutes(val);
    if (isNaN(Number(val))) {
      setMorningMinutesError("数値を入力してください");
    } else {
      setMorningMinutesError("");
    }
  };
  const handleCahngeAfternoonHour = (val: string) => {
    setAfternoonHour(val);
    if (isNaN(Number(val))) {
      setAfternoonHourError("数値を入力してください");
    } else {
      setAfternoonHourError("");
    }
  };
  const handleCahngeAfternoonMinutes = (val: string) => {
    setAfternoonMinutes(val);
    if (isNaN(Number(val))) {
      setAfternoonMinutesError("数値を入力してください");
    } else {
      setAfternoonMinutesError("");
    }
  };
  const handleCahngeEveningHour = (val: string) => {
    setEveningHour(val);
    if (isNaN(Number(val))) {
      setEveningHourError("数値を入力してください");
    } else {
      setEveningHourError("");
    }
  };
  const handleCahngeEveningMinutes = (val: string) => {
    setEveningMinutes(val);
    if (isNaN(Number(val))) {
      setEveningMinutesError("数値を入力してください");
    } else {
      setEveningMinutesError("");
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
