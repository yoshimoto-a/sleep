import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";
import { Baby } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";

export const putBaby = async (token: string, body: Baby) => {
  const prams: UpdateRequests = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: {
      data: body,
    },
  };

  try {
    const resp = await fetch("/api/dashboard/setting", {
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
