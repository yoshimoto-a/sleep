"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { ErrorMessage } from "../_components/ErrorMessage";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { supabase } from "@/utils/supabase";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const valid = () => {
    let isValid = true;
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "メールアドレスは必須です。";
      isValid = false;
    } else if (!email.match(/.+@.+\..+/)) {
      emailError = "メールアドレスの形式が正しくありません。";
      isValid = false;
    }
    if (!password) {
      passwordError = "パスワードは必須です。";
      isValid = false;
    } else if (password.length < 6) {
      passwordError = "パスワードは6文字以上で入力してください。";
      isValid = false;
    }

    setEmailErrorMessage(emailError);
    setPasswordErrorMessage(passwordError);

    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!valid()) return;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      },
    });
    if (error) {
      if (error.status === 422) {
        alert("登録済のメールアドレスです");
      } else {
        alert("登録に失敗しました");
      }
    } else {
      setEmail("");
      setPassword("");
      router.push("/signup/sentEmail/");
    }
  };
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">サインアップ</h1>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <form
          onSubmit={handleSubmit}
          className="bg-custom-gray shadow-md rounded px-8 pt-6 pb-8 mb-4 pointer-events-auto"
        >
          <div className="mb-4">
            <Input
              id="email"
              type="text"
              value={email}
              placeholder="メールアドレス"
              inputMode="email"
              onChange={value => setEmail(value)}
            />
            <ErrorMessage message={emailErrorMessage} />
          </div>
          <div className="mb-6">
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="パスワード"
              inputMode="text"
              onChange={value => setPassword(value)}
            />
            <ErrorMessage message={passwordErrorMessage} />
          </div>
          <div className="text-center">
            <button
              className="rounded-full w-32 bg-blue-500 text-white py-2"
              type="submit"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
