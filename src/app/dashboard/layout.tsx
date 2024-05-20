"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect, createContext } from "react";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { Footer } from "./_components/footer";
import { GetBaby } from "./setting/_utils/getBaby";
import { getLoginUser } from "@/utils/getLoginUser";

export const UserContext = createContext<[number | null, number | null]>([
  null,
  null,
]);
export default function Layout({
  children,
}: Readonly<{
  children: number;
}>) {
  const router = useRouter();
  const { token, session, isLoding } = useSupabaseSession();
  const [dbUserId, setDbUserId] = useState<number | null>(null);
  const [babyId, setBabyId] = useState<number | null>(null);
  useEffect(() => {
    const fetcher = async () => {
      try {
        //ユーザー情報の取得
        if (!token || !session) return;
        const { id, babyId } = await getLoginUser(token, session.user.id);
        if (id && babyId) {
          setDbUserId(id);
          setBabyId(babyId);
          const data = await GetBaby(token, babyId);
          if ("data" in data && data.data !== null) {
            const { data: babyData } = data;
            if (babyData.created === babyData.updated)
              router.replace("../dashboard/setting");
          }
        }
      } catch (e) {
        alert("ユーザー情報の取得に失敗しました。");
      }
    };
    !isLoding ? fetcher() : null;
  }, [token, session, router, isLoding]);
  return (
    <UserContext.Provider value={[dbUserId, babyId]}>
      {children}
      <Footer />
    </UserContext.Provider>
  );
}

/**const router = useRouter();
  // const { data: userData, error, isLoading } = useGetLoginUser();
  const { data, error, isLoading } = useGetBaby();
  const { session, isLoding } = useSupabaseSession();
  // const [dbUserId, setDbUserId] = useState<number | null>(null);
  // const [babyId, setBabyId] = useState<number | null>(null);

  if (isLoading || isLoding) return <IsLoading></IsLoading>;
  if (!session) {
    router.replace("../login");
  }

  if (error) return <div>エラー発生</div>;
  if (!data || data.status == 200 || !("data" in data))
    return <div>データなし</div>;
  if (data.data.created === data.data.updated)
    router.replace("../dashboard/setting");
  return (
    <>
      {children}
      <Footer />
    </>
  ); */
