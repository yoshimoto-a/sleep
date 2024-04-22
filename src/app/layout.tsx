import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Sleep",
  description: "睡眠に特化した育児記録アプリ",
};

const roboto400 = Roboto({
  weight: "400",
  preload: false,
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`max-w-md mx-auto bg-blue-200 text-gray-800 ${roboto400.className}`}
      >
        {children}
      </body>
    </html>
  );
}
