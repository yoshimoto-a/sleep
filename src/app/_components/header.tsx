import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="p-6 font-bold flex justify-between items-center">
      <Link href="/" className="header-link">
        Sleep
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/signup/" className="header-link">
          会員登録
        </Link>
        <Link href="/login/" className="header-link">
          ログイン
        </Link>
      </div>
    </header>
  );
};
