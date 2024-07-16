"use client";

import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Footer } from "../_components/footer";
import { Form } from "../_components/form";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { useLoginForm } from "./_hooks/useLoginForm";
import { SubmitButton } from "@/app/_components/submitButton";

export default function Page() {
  const { isSubmitting, handleSubmit, email, setEmail, password, setPassword } =
    useLoginForm();
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">ログイン</h1>
      <div>
        <Toaster position="top-center" />
      </div>
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
