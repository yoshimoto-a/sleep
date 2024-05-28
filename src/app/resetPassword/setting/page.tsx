"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Header } from "@/app/_components/header";
import { Input } from "@/app/_components/input";
import { supabase } from "@/utils/supabase";

export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      alert("パスワードの再設定に失敗しました");
    } else {
      setPassword("");
      alert("再設定に成功しました。ログインしてください");
      router.push("/login/");
    }
  };
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">パスワードの設定</h1>
      <div className="absolute inset-0 flex items-center justify-center"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-custom-gray shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <p className="mb-2 text-sm">新しいパスワード</p>
          <div className="mb-6">
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="パスワード"
              inputMode="text"
              onChange={value => setPassword(value)}
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
