"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Input } from "@/app/_components/input";
import { IsLoading } from "@/app/_components/isLoading";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { token, isLoding } = useSupabaseSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (isLoding) return <IsLoading />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    setIsSubmitting(true);
    const prams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ email }),
    };
    try {
      const resp = await fetch("/api/dashboard/subSignup", prams);
      const data: ApiResponse = await resp.json();
      if (data.status === 200) {
        setEmail("");
        router.push("/signup/sentEmail/");
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      alert(`サブアカウント招待に失敗しました.。${e}`);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-6">
        サブアカウントの作成
      </h1>
      <p className="text-center mt-6">
        招待したい人のメールアドレスを入力して送信してください
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
              inputMode="email"
              disabled={isSubmitting}
              onChange={value => setEmail(value)}
            />
          </div>
          <div className="text-center">
            <button
              className="rounded-full w-32 bg-blue-500 text-white py-2"
              type="submit"
              disabled={isSubmitting}
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
