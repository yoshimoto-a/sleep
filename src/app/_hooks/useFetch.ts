import useSWR from "swr";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

interface ApiResponse {
  status: 200 | 204 | 400 | 401 | 404;
}
export const useFetch = <T extends ApiResponse>(path: string) => {
  const { token, isLoding } = useSupabaseSession();
  const shouldFetchData = !isLoding && token;
  const fetcher = async () => {
    if (!token) return;
    const prams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const resp = await fetch(`/api/${path}`, prams);
    const data: T = await resp.json();
    console.log(data);
    if (data.status !== 200) {
      const errorData = await resp.json();
      throw new Error(
        errorData.message || "An error occurred while fetching the data."
      );
    }
    return data;
  };
  const results = useSWR(shouldFetchData ? `/api/${path}` : null, fetcher);
  return results;
};
