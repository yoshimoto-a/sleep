import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="w-full p-6 bg-blue-200 font-bold flex justify-between items-center z-50 top-0 sticky shadow">
      <Link href="/" className="header-link">
        Sleep
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/signup">ユーザー登録</Link>
        <Link href="/login">ログイン</Link>
      </div>
    </header>
  );
};
