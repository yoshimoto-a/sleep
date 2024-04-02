"use client";

import React from "react";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { PostRequests } from "@/app/_types/apiRequests/signup/postRequest";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session, isLoding, token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("ログインに失敗しました");
    } else {
      console.log(data.session);
      setEmail("");
      setPassword("");
      router.replace("../dashboard/sleep/");
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
          <div className="mb-4">
            <Input
              id="email"
              type="text"
              value={email}
              placeholder="メールアドレス"
              onChange={value => setEmail(value)}
            />
          </div>
          <div className="mb-6">
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="パスワード"
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
