"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ApiResponse } from "../../_types/apiRequests/login/PostResponse";
import { useApi } from "@/app/_hooks/useApi";
import { PostRequests } from "@/app/_types/apiRequests/login/PostRequest";
import { supabase } from "@/utils/supabase";

export const useLoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { post } = useApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("ログイン処理中...");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert("ログインに失敗しました");
        toast.dismiss(toastId);
        setIsSubmitting(false);
        return;
      }
      setEmail("");
      setPassword("");

      if (!data.session) throw new Error("session情報がありません");

      //userテーブルの登録をする
      const prams: PostRequests = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: data.session.access_token,
        },
        body: {
          supabaseUserId: data.user.id,
        },
      };
      const resp = await post<PostRequests, ApiResponse>("/api/login/", prams);

      if (resp.userExists) {
        //既に登録があるときはtrue→通常のログインの画面へ
        router.replace("/dashboard/sleep");
      } else {
        //falseは初めてのログインだから設定画面へ
        router.replace("/dashboard/setting");
      }
    } catch (e) {
      toast.error(String(e));
      router.replace("/");
    } finally {
      toast.dismiss(toastId);
      setIsSubmitting(false);
    }
  };
  return { isSubmitting, handleSubmit, email, setEmail, password, setPassword };
};
