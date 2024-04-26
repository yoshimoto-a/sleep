"use client";

import { useState, useEffect } from "react";
import { SubmitButton } from "@/app/_components/button";
import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";

export default function Page() {
  const [basic, setBasic] = useState<number | null>(null);
  const [morning, setMorning] = useState<number | null>(null);
  const [afternoon, setAfternoon] = useState<number | null>(null);
  const [evening, setEvening] = useState<number | null>(null);
  const [sinceBedtime, setSinceBedtime] = useState<number | null>(null);

  console.log(basic);
  //初期設定
  useEffect(() => {});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              <Input
                id="basic"
                type="number"
                value={String(basic)}
                placeholder=""
                onChange={value => setBasic(Number(value))}
              ></Input>
            </div>
            <div className="flex-1">
              <Label text="寝かしつけ開始は何分前？" htmlFor="basic"></Label>
              <Input
                id="sinceBedtime"
                type="number"
                value={String(sinceBedtime)}
                placeholder=""
                onChange={value => setSinceBedtime(Number(value))}
              ></Input>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>活動時間詳細設定</h2>
          <p className="mb-5">詳細登録がある場合、そちらが優先されます</p>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label text="朝寝(7時～11時)" htmlFor="morning" />
            <Input
              id="morning"
              type="number"
              value={String(morning)}
              placeholder=""
              onChange={value => setMorning(Number(value))}
            />
          </div>
          <div className="flex-1">
            <Label text="昼寝(11時～15時)" htmlFor="afternoon" />
            <Input
              id="afternoon"
              type="number"
              value={String(afternoon)}
              placeholder=""
              onChange={value => setAfternoon(Number(value))}
            />
          </div>
          <div className="flex-1">
            <Label text="夕寝(15時～18時)" htmlFor="evening" />
            <Input
              id="evening"
              type="number"
              value={String(evening)}
              placeholder=""
              onChange={value => setEvening(Number(value))}
            />
          </div>
        </div>
        <div className="text-center">
          <SubmitButton>保存</SubmitButton>
        </div>
      </form>
    </>
  );
}
