"use client";

import React from "react";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const fetcher = async (userId: string, token: string) => {
  //   const prams: PostRequests = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //     body: {
  //       supabaseUserId: userId,
  //       userName: name,
  //       role: "MAIN",
  //     },
  //   };
  //   const resp = await fetch("/api/signup/", {
  //     ...prams,
  //     body: JSON.stringify(prams.body),
  //   });
  //   return resp;
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });
    if (error) {
      alert("登録に失敗しました");
    } else {
      // try {
      //   console.log(data);
      //   if (data.user && data.session) {
      //     fetcher(data.user?.id, data.session?.access_token);
      //   } else {
      //     alert("例外発生");
      //   }
      // } catch (e) {
      //   console.log(e);
      // }
      setName("");
      setEmail("");
      setPassword("");
      router.push("/signup/sentEmail/");
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
              id="name"
              type="text"
              value={name}
              placeholder="ユーザーネーム"
              onChange={value => setName(value)}
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
