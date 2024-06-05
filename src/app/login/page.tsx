"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Footer } from "../_components/footer";
import { Form } from "../_components/form";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { PostUser } from "./utils/postUser";
import { SubmitButton } from "@/app/_components/submitButton";
import { getLoginUser } from "@/utils/getLoginUser";
import { supabase } from "@/utils/supabase";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
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

    try {
      if (!data.session) throw new Error("session情報がありません");
      const {
        access_token,
        user: { id },
      } = data.session;
      const { isRegistered } = await getLoginUser(access_token, id);
      if (!isRegistered) {
        const babyId: number | undefined | null =
          data.user?.user_metadata.babyId;
        const role = babyId ? "SUB" : "MAIN";
        const resp = await PostUser(id, role, access_token, babyId);
        if (resp.status !== 200) throw new Error("ユーザー登録失敗");
        router.replace("/dashboard/setting");
      }
      router.replace("/dashboard/sleep");
    } catch (e) {
      alert(String(e));
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">ログイン</h1>
      <Form handleSubmit={handleSubmit}>
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
        <div>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="パスワード"
            inputMode="text"
            disabled={isSubmitting}
            onChange={value => setPassword(value)}
          />
        </div>

        <Link
          href="/resetPassword/sendEmail"
          className="inline-block header-link mb-6"
        >
          パスワードの再設定はこちら
        </Link>
        <SubmitButton disabled={isSubmitting}>送信</SubmitButton>
      </Form>
      <Footer />
    </>
  );
}
