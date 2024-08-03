"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Button } from "@/app/_components/Button";
import { Footer } from "@/app/_components/footer";
import { Form } from "@/app/_components/form";
import { Header } from "@/app/_components/header";
import { Input } from "@/app/_components/input";
import { supabase } from "@/utils/supabase";
export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      alert("パスワードの再設定に失敗しました");
    } else {
      setPassword("");
      alert("再設定に成功しました。ログインしてください");
      router.push("/login/");
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">パスワードの設定</h1>
      <Form handleSubmit={handleSubmit}>
        <p className="mb-2 text-sm">新しいパスワード</p>
        <div className="mb-6">
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
        <div className="flex justify-center">
          <div className="w-32 h-10">
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained-blu500"
            >
              送信
            </Button>
          </div>
        </div>
      </Form>
      <Footer />
    </>
  );
}
