"use client";
import React from "react";
import { useState, useEffect, createContext } from "react";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { GetLoginUser } from "../../utils/getLoginUser";
import { useRouter } from "next/navigation";
import { GetBaby } from "./setting/_utils/getBaby";

export const UserContext = createContext([0, 0]);

import useSWR from "swr";
import { IndexResponse } from "../_types/apiRequests/login";

const fetcher = async () => {
  const resp = await fetch(`/api/login?supabaseUserId=${supabaseUserId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!resp.ok) {
    throw new Error("Failed to fetch");
  }

  const data: IndexResponse = await resp.json();

  return data;
};

export default function Layout({
  children,
}: Readonly<{
  children: number;
}>) {
  const router = useRouter();
  const { token, session } = useSupabaseSession();
  const [dbUserId, setDbUserId] = useState(0);
  const [babyId, setBabyId] = useState(0);
  const { data, error, isLoading, mutate } = useSWR<IndexResponse>(`/api/login`, fetcher);
  // useEffect(() => {
  //   const fetcher = async () => {
  //     try {
  //       //ユーザー情報の取得
  //       if (token && session) {
  //         const { id, babyId } = await GetLoginUser(token, session.user.id);
  //         if (id && babyId) {
  //           setDbUserId(id);
  //           setBabyId(babyId);
  //           const data = await GetBaby(token, babyId);
  //           if ("data" in data && data.data !== null) {
  //             const { data: babyData } = data;
  //             if (babyData.created === babyData.updated)
  //               router.replace("../dashboard/setting");
  //           }
  //         }
  //       }
  //     } catch (e) {
  //       alert("ユーザー情報の取得に失敗しました。");
  //       //ログアウトさせる？？
  //     }
  //   };
  //   fetcher();
  // }, [token, session]);
  return (
    <UserContext.Provider value={[dbUserId, babyId]}>
      {children}
    </UserContext.Provider>
  );
}
