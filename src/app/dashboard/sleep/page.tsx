"use client";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useRouter } from "next/navigation";
import { UserContext } from "../layout";
import { useContext } from "react";

export default function Page() {
  const router = useRouter();
  const dbUserIdid = useContext(UserContext);
  const { session, isLoding } = useSupabaseSession();
  if (isLoding) return <p>Loading</p>;
  if (!session) {
    router.push("/login/");
    return null;
  }

  return <h1>現在のユーザーのIDは{dbUserIdid}です。</h1>;
}
