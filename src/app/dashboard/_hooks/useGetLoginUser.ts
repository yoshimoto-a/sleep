import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/login";

export const useGetLoginUser = () => {
  const { token, session, isLoding } = useSupabaseSession();
  const shouldFetchData = !isLoding && token && session;
  const fetcher = async () => {
    if (!token || !session?.user.id) return;
    const prams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const resp = await fetch(
      `/api/login?supabaseUserId=${session?.user.id}`,
      prams
    );
    const data: IndexResponse = await resp.json();
    if (data.status !== 200) {
      throw new Error("error in fetcher");
    }
    return data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetchData ? `/api/login?supabaseUserId=${session?.user.id}` : null,
    fetcher
  );
  return { data, error, isLoading, mutate };
};
