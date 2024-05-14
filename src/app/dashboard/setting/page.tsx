//赤ちゃんの設定
"use client";

import { Gender } from "@prisma/client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../layout";
import { GetBaby } from "./_utils/getBaby";
import { PutBaby } from "./_utils/putBaby";
import { Header } from "@/app/_components/header";
import { Input } from "@/app/_components/input";
import { InputRadio } from "@/app/_components/inputRadio";
import { Label } from "@/app/_components/label";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Baby } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";

export default function Page() {
  const { token } = useSupabaseSession();
  const [babyName, setBabyName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [expectedDateOfBirth, setExpectedDateOfBirth] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [, babyId] = useContext(UserContext);
  const router = useRouter();
  //初期設定
  useEffect(() => {
    const fetcher = async () => {
      try {
        if (token && babyId && babyId !== 0) {
          const data = await GetBaby(token, babyId);
          if ("data" in data && data.data !== null) {
            const { data: babyData } = data;
            setBabyName(String(babyData.name));
            setBirthWeight(String(babyData.birthWeight));
            setBirthday(String(dayjs(babyData.birthday).format("YYYY-MM-DD")));
            setExpectedDateOfBirth(
              String(dayjs(babyData.expectedDateOfBirth).format("YYYY-MM-DD"))
            );
            setGender(babyData.gender);
          }
        }
      } catch (e) {
        alert("保存情報の取得に失敗しました");
      }
    };
    fetcher();
  }, [token, babyId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token && gender) {
      try {
        const body: Baby = {
          name: babyName,
          birthday: dayjs(birthday).toDate(),
          expectedDateOfBirth: dayjs(expectedDateOfBirth).toDate(),
          birthWeight: parseInt(birthWeight),
          gender,
        };
        if (babyId) await PutBaby(token, babyId, body);
        router.replace("/dashboard/sleep/");
      } catch (e) {
        alert("更新に失敗しました");
      }
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
              inputMode="text"
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
              inputMode="numeric"
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
              inputMode="numeric"
              onChange={value => setExpectedDateOfBirth(value)}
            />
          </div>
          <Label text="出生体重" htmlFor="birthWeight" />
          <div className="mb-4">
            <Input
              id="birthWeight"
              type="text"
              value={birthWeight}
              placeholder=""
              inputMode="numeric"
              onChange={value => setBirthWeight(value)}
            />
          </div>
          <div className="mb-6">
            <InputRadio
              id="boy"
              name="gender"
              value={Gender.BOY}
              label="男の子"
              checkedValue={gender}
              onChange={() => setGender(Gender.BOY)}
            />
            <InputRadio
              id="girl"
              name="gender"
              value={Gender.GIRL}
              label="女の子"
              checkedValue={gender}
              onChange={() => setGender(Gender.GIRL)}
            />
          </div>
          <div className="text-center">
            <button
              className="rounded-full w-32 bg-blue-500 text-white py-2"
              type="submit"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
