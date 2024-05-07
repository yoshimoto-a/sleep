import { useContext } from "react";
import { UserContext } from "../../layout";
import { DateState } from "./useToggle";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { updateRequests } from "@/app/_types/apiRequests/dashboard/advancedSetting/updateRequest";

export const useUpdateGrowth = async (
  id: number,
  date: DateState,
  value: string
) => {
  const [dbUserId, babyId] = useContext(UserContext);
  const { token, isLoding } = useSupabaseSession();

  if (isLoding || !token || !babyId || !dbUserId || !date[value]) return;
  const prams: updateRequests = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: {
      id,
      data: {
        babyId,
        startedAt: date[value] as Date,
        archevedAt: new Date(),
        changeUser: dbUserId,
      },
    },
  };

  const resp = await fetch("/api/dashboard/growth", {
    ...prams,
    body: JSON.stringify(prams.body),
  });
  return { resp };
};
