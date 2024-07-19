//赤ちゃんの設定
"use client";

import { Gender } from "@prisma/client";
import React from "react";
import { FormSection } from "./_components/FormSection";
import { useBaby } from "./_hooks/useBaby";
import { InputRadio } from "@/app/_components/inputRadio";
import { IsLoading } from "@/app/_components/isLoading";
import { SubmitButton } from "@/app/_components/submitButton";
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
    errors,
  } = useBaby();

  if (isLoading) return <IsLoading />;
  if (error) return <div>エラー発生</div>;

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-6">設定</h1>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-custom-gray shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <FormSection
            label="ニックネーム"
            id="babyName"
            disabled={isSubmitting}
            inputMode="text"
            onChange={value => setBabyName(value)}
            placeholder=""
            type="text"
            value={babyName}
            error={errors.babyName}
          />

          <FormSection
            label="生年月日"
            id="birthday"
            disabled={isSubmitting}
            inputMode="numeric"
            onChange={value => setBirthday(value)}
            placeholder=""
            type="date"
            value={birthday}
            error={errors.birthday}
          />
          <FormSection
            label="出産予定日"
            id="expectedDateOfBirth"
            disabled={isSubmitting}
            inputMode="numeric"
            onChange={value => setExpectedDateOfBirth(value)}
            placeholder=""
            type="date"
            value={expectedDateOfBirth}
            error={errors.expectedDateOfBirth}
          />
          <FormSection
            label="出生体重"
            id="birthWeight"
            disabled={isSubmitting}
            inputMode="numeric"
            onChange={value => setBirthWeight(value)}
            placeholder=""
            type="text"
            value={birthWeight}
            error={errors.birthWeight}
          />
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
            {errors.gender && (
              <div className="text-red-500">{errors.gender}</div>
            )}
          </div>
          <SubmitButton disabled={isSubmitting}>保存</SubmitButton>
        </form>
      </div>
    </>
  );
}
