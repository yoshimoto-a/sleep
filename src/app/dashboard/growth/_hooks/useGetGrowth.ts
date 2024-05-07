import { useContext } from "react";
import { UserContext } from "../../layout";
import { DateState } from "./useToggle";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export const useUpdateGrowth = async (date: DateState, value: string) => {
  const [dbUserId, babyId] = useContext(UserContext);
  const { token, isLoding } = useSupabaseSession();

  if (isLoding || !token || !babyId || !date[value]) return;
  const prams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const resp = await fetch(`/api/dashboard/growth?babyId=${babyId}`, prams);
  return { resp };
};
