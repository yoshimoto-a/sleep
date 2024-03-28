import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <p>
          赤ちゃんが一番眠りやすい
          <br />
          タイミングを逃さない
        </p>
        <h1 className="text-5xl m-5">sleep</h1>
        <p>睡眠に特化した育児記録アプリ</p>
      </div>

      <div className="flex items-center gap-10">
        <div className="px-5 py-2 w-150 bg-gray-300 rounded-full">
          <Link href="./signup" className="header-link">
            会員登録
          </Link>
        </div>
        <div className="px-5 py-2  w-150 bg-gray-300 rounded-full">
          <Link href="/login" className="header-link">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
