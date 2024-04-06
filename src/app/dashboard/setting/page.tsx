//赤ちゃんの設定
"use client";

import React from "react";
import { Header } from "@/app/_components/header";
import { Input } from "@/app/_components/input";
import { Label } from "@/app/_components/label";
import { InputRadio } from "@/app/_components/inputRadio";
import { useState, useEffect } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Gender } from "@prisma/client";
import { UserContext } from "../layout";
import { useContext } from "react";
import { GetBaby } from "./_utils/getBaby";
import { Baby } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";
import { PutBaby } from "./_utils/putBaby";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";

export default function Page() {
  const { token } = useSupabaseSession();
  const [babyName, setBabyName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [expectedDateOfBirth, setExpectedDateOfBirth] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [babyId] = useContext(UserContext);
  //初期設定
  useEffect(() => {
    const fetcher = async () => {
      if (token && babyId !== 0) {
        const data = await GetBaby(token, babyId);
        console.log(data);
        if ("data" in data && data.data !== null) {
          const { data: babyData } = data;
          setBabyName(String(babyData.name));
          setBirthWeight(String(babyData.birthWeight));
          setBirthday(String(babyData.birthday));
          setExpectedDateOfBirth(String(babyData.expectedDateOfBirth));
          setGender(babyData.gender);
        }
      }
    };
    fetcher();
  }, [token, babyId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token && gender) {
      const body: Baby = {
        name: babyName,
        birthday: new Date(birthday),
        expectedDateOfBirth: new Date(expectedDateOfBirth),
        birthWeight: parseInt(birthWeight),
        gender,
      };
      const data: ApiResponse = await PutBaby(token, babyId, body);
      if (data.status !== 200) alert("更新失敗");
    }
  };
  return (
    <>
      <Header />
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-custom-gray shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <Label text="ニックネーム" htmlFor="babyName" />
          <div className="mb-4">
            <Input
              id="babyName"
              type="text"
              value={babyName}
              placeholder=""
              onChange={value => setBabyName(value)}
            />
          </div>
          <Label text="生年月日" htmlFor="birthday" />
          <div className="mb-4">
            <Input
              id="birthday"
              type="date"
              value={birthday}
              placeholder=""
              onChange={value => setBirthday(value)}
            />
          </div>
          <Label text="出産予定日" htmlFor="expectedDateOfBirth" />
          <div className="mb-4">
            <Input
              id="expectedDateOfBirth"
              type="date"
              value={expectedDateOfBirth}
              placeholder=""
              onChange={value => setExpectedDateOfBirth(value)}
            />
          </div>
          <Label text="出生体重" htmlFor="birthWeight" />
          <div className="mb-4">
            <Input
              id="birthWeight"
              type="number"
              value={birthWeight}
              placeholder=""
              onChange={value => setBirthWeight(value)}
            />
          </div>
          <div className="mb-6">
            <InputRadio
              id="boy"
              name="gender"
              value={Gender.BOY}
              label="男の子"
              onChange={() => setGender(Gender.BOY)}
            />
            <InputRadio
              id="girl"
              name="gender"
              value={Gender.GIRL}
              label="女の子"
              onChange={() => setGender(Gender.GIRL)}
            />
          </div>
          <div className="text-center">
            <button
              className="rounded-full w-32 bg-blue-500 text-white py-2"
              type="submit"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
