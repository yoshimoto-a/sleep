import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { UserUpdateRequests } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";

export const PutUser = async (id: number, babyId: number, token: string) => {
  const prams: UserUpdateRequests = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: {
      id,
      babyId,
    },
  };
  try {
    const resp = await fetch("/api/login/", {
      ...prams,
      body: JSON.stringify(prams.body),
    });
    if (resp.status !== 200) {
      throw new Error(`HTTP error. status: ${resp.status}`);
    }
    const data: ApiResponse = await resp.json();
    return data;
  } catch (e) {
    throw e;
  }
};
