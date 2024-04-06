//使わない
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";

export const HasBabyTable = async (token: string, dbUserId: number) => {
  const resp = await fetch(`/api/dashboard/setting?id=${dbUserId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const data: IndexResponse = await resp.json();
  console.log(data);
  return data;
};
