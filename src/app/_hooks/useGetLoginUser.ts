import { useFetch } from "./useFetch";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { IndexResponse } from "@/app/_types/apiRequests/login";

export const useGetLoginUser = () => {
  const { session } = useSupabaseSession();
  const { data, error, isLoading, mutate } = useFetch<IndexResponse>(
    `login?supabaseUserId=${session?.user.id}`
  );

  return {
    id: data?.data?.id,
    role: data?.data?.role,
    error,
    isLoading,
    mutate,
  };
};
