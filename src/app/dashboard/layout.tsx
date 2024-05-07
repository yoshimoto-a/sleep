"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect, createContext } from "react";
import { GetLoginUser } from "../../utils/getLoginUser";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { Footer } from "./_components/footer";
import { GetBaby } from "./setting/_utils/getBaby";

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
  const { token, session } = useSupabaseSession();
  const [dbUserId, setDbUserId] = useState<number | null>(null);
  const [babyId, setBabyId] = useState<number | null>(null);
  useEffect(() => {
    const fetcher = async () => {
      try {
        //ユーザー情報の取得
        if (token && session) {
          const { id, babyId } = await GetLoginUser(token, session.user.id);
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
        }
      } catch (e) {
        alert("ユーザー情報の取得に失敗しました。");
      }
    };
    fetcher();
  }, [token, session, router]);
  return (
    <UserContext.Provider value={[dbUserId, babyId]}>
      {children}
      <Footer />
    </UserContext.Provider>
  );
}
