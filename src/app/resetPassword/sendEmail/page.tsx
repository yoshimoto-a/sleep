"use client";

import React from "react";
import { useState } from "react";
import { Footer } from "@/app/_components/footer";
import { Form } from "@/app/_components/form";
import { Header } from "@/app/_components/header";
import { Input } from "@/app/_components/input";
import { SubmitButton } from "@/app/_components/submitButton";
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
      <Form handleSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            id="email"
            type="text"
            value={email}
            inputMode="text"
            placeholder="メールアドレス"
            onChange={value => setEmail(value)}
          />
        </div>
        <SubmitButton>送信</SubmitButton>
      </Form>
      <Footer />
    </>
  );
}
