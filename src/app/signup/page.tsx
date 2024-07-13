"use client";

import React from "react";
import { ErrorMessage } from "../_components/ErrorMessage";
import { Footer } from "../_components/footer";
import { Form } from "../_components/form";
import { Header } from "../_components/header";
import { Input } from "../_components/input";
import { useSignupForm } from "./_hooks/useSingnupForm";
import { SubmitButton } from "@/app/_components/submitButton";
export default function Page() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordErrorMessage,
    emailErrorMessage,
    isSubmitting,
    handleSubmit,
  } = useSignupForm();

  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold mt-6">サインアップ</h1>

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
          <ErrorMessage message={emailErrorMessage} />
        </div>
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
          <ErrorMessage message={passwordErrorMessage} />
        </div>
        <SubmitButton disabled={isSubmitting}>送信</SubmitButton>
      </Form>
      <Footer />
    </>
  );
}
