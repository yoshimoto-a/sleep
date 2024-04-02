"use client";

import { Header } from "@/app/_components/header";
export default function EmailSent() {
  return (
    <>
      <Header />
      <div className="absolute inset-0 flex items-center justify-center">
        <p>
          ご登録のメールアドレス宛にメールを送信しました。
          <br />
          ご確認おねがいします
        </p>
      </div>
    </>
  );
}
