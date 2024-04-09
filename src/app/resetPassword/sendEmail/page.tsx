"use client";

import React from "react";
import { Header } from "@/app/_components/header";
import { Input } from "@/app/_components/input";
import { useState } from "react";
import { supabase } from "@/utils/supabase";

export default function Page() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/resetPassword/setting",
    });
    if (error) {
      alert("再設定メールの送信に失敗しました");
    } else {
      setEmail("");
      alert("パスワード設定メールを確認してください");
    }
  };
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">パスワードの設定</h1>
      <p className="text-center mt-6">
        パスワードの設定用URLを下記アドレス宛に送信します
      </p>
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-custom-gray shadow-md rounded flex flex-col items-center justify-center px-8 pt-6 pb-8 w-64 h-64"
        >
          <div className="mb-4">
            <Input
              id="email"
              type="text"
              value={email}
              placeholder="メールアドレス"
              onChange={value => setEmail(value)}
            />
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
