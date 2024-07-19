"use client";

import { useState } from "react";

interface ErrorType {
  babyName: string;
  birthday: string;
  expectedDateOfBirth: string;
  birthWeight: string;
  gender: string;
}
export const useValidation = (
  babyName: string,
  birthday: string,
  expectedDateOfBirth: string,
  birthWeight: string,
  gender: string
) => {
  const [errors, setErrors] = useState<ErrorType>({
    babyName: "",
    birthday: "",
    expectedDateOfBirth: "",
    birthWeight: "",
    gender: "",
  });

  const validate = () => {
    const newErrors: ErrorType = {
      babyName: "",
      birthday: "",
      expectedDateOfBirth: "",
      birthWeight: "",
      gender: "",
    };
    if (!babyName) newErrors.babyName = "名前は必須です";
    if (!birthday) newErrors.birthday = "誕生日は必須です";
    if (!expectedDateOfBirth)
      newErrors.expectedDateOfBirth = "予定日は必須です";
    if (!birthWeight || isNaN(Number(birthWeight)))
      newErrors.birthWeight = "出生体重は数値でなければなりません";
    if (!gender) newErrors.gender = "性別は必須です";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    validate,
  };
};
