import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Sleep",
  description: "睡眠に特化した育児記録アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="max-w-md mx-auto bg-blue-200 text-gray-800">
        {children}
      </body>
    </html>
  );
}
