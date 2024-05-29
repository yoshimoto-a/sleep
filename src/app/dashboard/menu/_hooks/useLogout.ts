import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { supabase } from "@/utils/supabase";

export const useLogout = () => {
  const router = useRouter();
  const logout = useCallback(async () => {
    const result = confirm("ログアウトしますか？");
    if (!result) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("ログインに失敗しました");
      return;
    }
    router.push("/login/");
  }, [router]);
  return { logout };
};
