"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PostRequest } from "../_types/apiRequests/guest_login/PostRequest";
import { PostResponse } from "../_types/apiRequests/guest_login/PostResponse";
import { useApi } from "./useApi";
import { supabase } from "@/utils/supabase";

export const useGuestLogin = () => {
  const { post } = useApi();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClick = async () => {
    //すでに押されていたらリターンする
    if (isSubmitting) return;
    const toastId = toast.loading("ログイン処理中...");
    setIsSubmitting(true);
    const resp = await post<PostRequest, PostResponse>("/api/guest_login", {});

    if (resp.status === 200) {
      await supabase.auth.setSession(resp.session);
      router.replace("/dashboard/sleep");
      toast.dismiss(toastId);
    } else {
      alert(resp.message);
    }
    setIsSubmitting(false);
  };
  return { handleClick };
};
