import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";
import { Baby } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";

export const PutBaby = async (token: string, babyId: number, body: Baby) => {
  const prams: UpdateRequests = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: {
      id: babyId,
      data: body,
    },
  };

  const resp = await fetch("/api/dashboard/setting", {
    ...prams,
    body: JSON.stringify(prams.body),
  });
  const data: ApiResponse = await resp.json();
  return data;
};
