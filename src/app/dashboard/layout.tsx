"use client";
import { useRouter, usePathname } from "next/navigation"; // `usePathname` を追加
import React, { useEffect, Suspense } from "react";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { useGetBaby } from "./_hooks/useGetBaby";
import { useGetWakeWindows } from "./_hooks/useGetWakeWindows";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得
  const { session, isLoding } = useSupabaseSession();
  const { wakeWindowsData, isLoading: wakeWindowsIsLoading } =
    useGetWakeWindows();
  const { data, isLoading, error } = useGetBaby();

  // セッションがない場合、ログインページにリダイレクト
  useEffect(() => {
    if (!isLoding && session == null) {
      router.replace("/login");
      return;
    }
  }, [isLoding, session, router]);

  /*初回更新が未済なら設定画面へリダイレクト
   wakeWindowsがない(status204)場合、登録ページにリダイレクト*/
  useEffect(() => {
    if (isLoding || wakeWindowsIsLoading || isLoading) return;

    // セッションがない場合
    if (session === null) {
      router.replace("/login");
      return;
    }

    // エラーがある場合
    if (error) {
      router.replace("/login");
      return;
    }

    // 初回更新が未済の場合
    if (data && data.data.updated === data.data.created) {
      if (pathname !== "/dashboard/setting") {
        router.replace("/dashboard/setting");
      }
      return;
    }

    // wakeWindowsがない場合
    if (wakeWindowsData?.status === 204) {
      if (pathname !== "/dashboard/wakeWindows") {
        router.replace("/dashboard/wakeWindows");
      }
      return;
    }
  }, [
    isLoading,
    wakeWindowsIsLoading,
    isLoding,
    error,
    data,
    wakeWindowsData,
    session,
    router,
    pathname,
  ]);

  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
}
