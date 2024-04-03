"use client";

import React from "react";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { GetLoginUser } from "./utils/getLoginUser";
import { PostUser } from "./utils/postUser";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("ログインに失敗しました");
    } else {
      setEmail("");
      setPassword("");
      if (data.session) {
        const {
          access_token,
          user: { id },
        } = data.session;
        if (token) {
          const { isRegistered } = await GetLoginUser(access_token, id);
          alert(isRegistered ? "初回ログインではない" : "初回ログイン");
          if (!isRegistered) {
            //レスポンス内のbabyIdの有無を元に第二引数の値は変更する
            const resp = await PostUser(id, "MAIN", access_token);
          }
        }
      }

      //router.replace("../dashboard/sleep/");
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
