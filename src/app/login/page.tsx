"use client";

import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "../_components/Button";
import { HookFormInput } from "../_components/HookFormInput";
import { Footer } from "../_components/footer";
import { Form } from "../_components/form";
import { Header } from "../_components/header";
import { useLoginForm } from "./_hooks/useLoginForm";
export default function Page() {
  const { register, handleSubmit, isSubmitting, errors } = useLoginForm();
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">ログイン</h1>
      <div>
        <Toaster position="top-center" />
      </div>
      <Form handleSubmit={handleSubmit}>
        <HookFormInput
          name="email"
          type="text"
          placeholder="メールアドレス"
          inputMode="email"
          isSubmitting={isSubmitting}
          validation={{
            required: "メールアドレスは必須です",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "メールアドレスの形式が不正です。",
            },
          }}
          register={register}
          errors={errors}
        />
        <HookFormInput
          name="password"
          type="password"
          placeholder="パスワード"
          inputMode="text"
          isSubmitting={isSubmitting}
          validation={{
            required: "パスワードを入力してください",
          }}
          register={register}
          errors={errors}
        />

        <Link
          href="/resetPassword/sendEmail"
          className="inline-block header-link mb-6"
        >
          パスワードの再設定はこちら
        </Link>
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
