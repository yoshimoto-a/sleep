import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Sleep",
  description: "睡眠に特化した育児記録アプリ",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto" /**variable使用しないと上手くいかない */,
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="">
      <body
        className={`relative max-w-md mx-auto h-screen bg-blue-200 text-gray-800 ${roboto.variable}`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.GA_ID ?? ""} />
    </html>
  );
}
