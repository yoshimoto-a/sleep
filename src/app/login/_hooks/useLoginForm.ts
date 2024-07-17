"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ApiResponse } from "../../_types/apiRequests/login/PostResponse";
import { useApi } from "@/app/_hooks/useApi";
import { PostRequests } from "@/app/_types/apiRequests/login/postRequest";
import { supabase } from "@/utils/supabase";

type LoginFormInputs = {
  email: string;
  password: string;
};
export const useLoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { post } = useApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsSubmitting(true);
    const toastId = toast.loading("ログイン処理中...");
    try {
      const { data: signInData, error } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      if (error) {
        alert("ログインに失敗しました");
        toast.dismiss(toastId);
        setIsSubmitting(false);
        return;
      }

      if (!signInData.session) throw new Error("session情報がありません");

      //userテーブルの登録をする
      const prams: PostRequests = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: signInData.session.access_token,
        },
        body: {
          supabaseUserId: signInData.user.id,
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
  return {
    isSubmitting,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
