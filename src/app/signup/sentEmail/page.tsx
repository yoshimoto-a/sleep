"use client";

import { Footer } from "@/app/dashboard/_components/footer";
export default function EmailSent() {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <p>
          ご登録のメールアドレス宛にメールを送信しました。
          <br />
          ご確認おねがいします
        </p>
      </div>
      <Footer />
    </>
  );
}
