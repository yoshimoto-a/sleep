"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { Footer } from "./_components/footer";
import { useGetBaby } from "./_hooks/useGetBaby";
import { useGetWakeWindows } from "./_hooks/useGetWakeWindows";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { session, isLoding } = useSupabaseSession();
  const {
    wakeWindowsData,
    isLoading: wakeWindowsIsLoading,
    mutate,
  } = useGetWakeWindows();
  const { data, isLoading, error } = useGetBaby();
  // セッションがない場合、ログインページにリダイレクト
  useEffect(() => {
    if (!isLoding && session == null) {
      router.replace("/login");
      return;
    }
  }, [isLoding, session, router]);

  //初回更新が未済なら設定画面へリダイレクト
  useEffect(() => {
    if (isLoading) return;
    if (error) {
      router.replace("/login");
      return;
    }
    //dataがundefindeでここまで来る挙動を確認したため「data&&」追加
    if (data && data.data.updated === data.data.created) {
      router.replace("/dashboard/setting");
      return;
    }
  }, [isLoading, error, router, data]);
  // wakeWindowsがない(status204)場合、登録ページにリダイレクト
  useEffect(() => {
    if (wakeWindowsIsLoading) return;
    if (wakeWindowsData?.status === 204) {
      router.replace("/dashboard/wakeWindows");
      return;
    }
  }, [wakeWindowsIsLoading, router, wakeWindowsData]);
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
