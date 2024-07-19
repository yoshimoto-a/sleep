//赤ちゃんの設定
"use client";

import { Gender } from "@prisma/client";
import React from "react";
import { useBaby } from "./_hooks/useBaby";
import { Input } from "@/app/_components/input";
import { InputRadio } from "@/app/_components/inputRadio";
import { IsLoading } from "@/app/_components/isLoading";
import { Label } from "@/app/_components/label";
export default function Page() {
  const {
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
  } = useBaby();

  if (isLoading) return <IsLoading />;
  if (error) return <div>エラー発生</div>;

  return (
    <>
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
