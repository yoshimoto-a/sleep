import { useCallback } from "react";
import { supabase } from "@/utils/supabase";

export const useApi = () => {
  const get = useCallback(async <ResponseType>(endpoint: string) => {
    try {
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: (
            await supabase.auth.getSession()
          ).data.session?.access_token!,
        },
      });

      if (response.status !== 200) {
        throw new Error("データの取得に失敗しました。");
      }

      const data: ResponseType = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }, []);

  const post = async <RequestType, ResponseType>(
    endpoint: string,
    payload: RequestType
  ) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (
            await supabase.auth.getSession()
          ).data.session?.access_token!,
        },
        body: JSON.stringify(payload),
      });

      if (response.status !== 200) throw new Error("登録に失敗しました。");

      const data: ResponseType = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const put = async <RequestType, ResponseType>(
    endpoint: string,
    payload: RequestType
  ) => {
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (
            await supabase.auth.getSession()
          ).data.session?.access_token!,
        },
        body: JSON.stringify(payload),
      });
      if (response.status !== 200) throw new Error("更新に失敗しました。");

      const data: ResponseType = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const del = async <RequestType, ResponseType>(endpoint: string) => {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (
            await supabase.auth.getSession()
          ).data.session?.access_token!,
        },
      });

      if (response.status !== 200) throw new Error("削除に失敗しました。");

      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { get, post, put, del };
};
