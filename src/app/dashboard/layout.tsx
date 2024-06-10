"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, createContext } from "react";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { Footer } from "./_components/footer";
import { useGetBaby } from "./_hooks/useBaby";
import { useGetWakeWindows } from "./_hooks/useGetWakeWindows";
import { getLoginUser } from "@/utils/getLoginUser";

export const UserContext = createContext<[number | null, number | null]>([
  null,
  null,
]);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { token, session, isLoding } = useSupabaseSession();
  const [dbUserId, setDbUserId] = useState<number | null>(null);
  const [babyId, setBabyId] = useState<number | null>(null);
  const { error, isLoading: isWakeWindowsLoading } = useGetWakeWindows();
  const { data, isLoading, error: babyError } = useGetBaby();
  console.log(data, isLoading);
  // セッションがない場合、ログインページにリダイレクト
  useEffect(() => {
    if (!isLoding && session == null) {
      router.replace("/login");
    }
  }, [isLoding, session, router]);

  //ユーザー情報の取得
  useEffect(() => {
    if (!session || !token) return;
    const fetcher = async () => {
      try {
        const { id } = await getLoginUser(token, session.user.id);
        setDbUserId(id);
      } catch (e) {
        alert("ユーザー登録の取得に失敗しました");
        router.replace("/login");
      }
    };
    fetcher();
  }, [token, session, router, isLoding]);

  // //赤ちゃんID取得して初回更新が未済ならページ遷移
  useEffect(() => {
    if (isLoading || !data) return;
    if (babyError) {
      alert("赤ちゃん情報の取得に失敗しました");
      router.replace("/login");
    }
    const fetcher = async () => {
      try {
        if ("data" in data && !data.data.name) {
          //作成日・更新日の一致では判別できず。
          setBabyId(data.data.id);
          router.replace("/dashboard/setting");
        }
      } catch (e) {
        alert("赤ちゃん情報の取得に失敗しました。");
        router.replace("/login");
      }
    };
    fetcher();
  }, [router, isLoading, data, babyError]);

  // //活動時間の設定がなければ設定画面へ
  useEffect(() => {
    if (isWakeWindowsLoading) return;
    if (error?.status === 204) {
      router.replace("/dashboard/wakeWindows");
    }
  }, [router, error, isWakeWindowsLoading]);

  return (
    <UserContext.Provider value={[dbUserId, babyId]}>
      {children}
      <Footer />
    </UserContext.Provider>
  );
}
