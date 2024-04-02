"use client";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { session, isLoding } = useSupabaseSession();
  console.log("取得前" + session);
  if (isLoding) return <p>Loading</p>;
  console.log("取得後" + session);
  if (!session) {
    router.push("/login/");
    return null;
  }

  return <h1>ログイン後ページ</h1>;
}
