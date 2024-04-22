"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { GetLoginUser } from "../../utils/getLoginUser";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { PostUser } from "./utils/postUser";
import { supabase } from "@/utils/supabase";

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
      return;
    }
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
            const babyId: number | undefined | null =
              data.user?.user_metadata.babyId;
            const role = babyId ? "SUB" : "MAIN";
            const resp = await PostUser(id, role, access_token, babyId);
            if (resp.status !== 200) throw new Error("ユーザー登録失敗");
            router.replace("../dashboard/setting");
          }
          router.replace("/dashboard/sleep");
        } catch (e) {
          alert("ログインに失敗しました");
        }
      }
    }
  };
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">ログイン</h1>
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
            <Link href="/resetPassword/sendEmail" className="header-link">
              パスワードの再設定はこちら
            </Link>
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
