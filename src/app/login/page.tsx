"use client";

import React from "react";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { GetLoginUser } from "../../utils/getLoginUser";
import { PostUser } from "./utils/postUser";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";

export default function Page() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
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
      return;
    }
    setUserName("");
    setEmail("");
    setPassword("");
    if (data.session) {
      const {
        access_token,
        user: { id },
      } = data.session;
      if (token) {
        try {
          const { isRegistered } = await GetLoginUser(access_token, id);
          if (!isRegistered) {
            //レスポンス内のbabyIdの有無を元に第二引数の値は変更する
            const resp = await PostUser(id, "MAIN", userName, access_token);
          }
        } catch (e) {
          console.log(e);
          alert("ユーザー情報の取得に失敗しました");
        }
      }
    }
    //初期設定の状況を見て遷移する先を変える

    router.replace("../dashboard/sleep");
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
              id="userName"
              type="text"
              value={userName}
              placeholder="ユーザーネーム"
              onChange={value => setUserName(value)}
            />
          </div>
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
