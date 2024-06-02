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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/resetPassword/setting`,
    });
    if (error) {
      alert("再設定メールの送信に失敗しました");
    } else {
      setEmail("");
      alert("パスワード設定メールを確認してください");
    }
    setIsSubmitting(false);
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
            disabled={isSubmitting}
            onChange={value => setEmail(value)}
          />
        </div>
        <SubmitButton disabled={isSubmitting}>送信</SubmitButton>
      </Form>
      <Footer />
    </>
  );
}
