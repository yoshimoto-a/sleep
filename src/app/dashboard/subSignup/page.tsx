"use client";

import React from "react";
import { Header } from "@/app/_components/header";
import { Input } from "@/app/_components/input";
import { useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useRouter } from "next/navigation";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/subSignup/postRequest";
import { GetLoginUser } from "@/utils/getLoginUser";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { token, session } = useSupabaseSession();
  //const { babyId}= GetLoginUser(token,null,session?.user.id)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(token) {const prams: PostRequests = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: token,
    //   },
    //   body: {
    //     email,
    //     // babyId,
    //   },
    // };}

    //   const resp = await fetch("/api/bashboard/subSignup", {
    //     ...prams,
    //     body: JSON.stringify(prams.body),
    //   });
    // }
    // if (error) {
    //   console.log(error);
    //   alert("登録に失敗しました");
    // } else {
    //   setEmail("");
    //   router.push("/signup/sentEmail/");
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
