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
  const resp = await fetch("/api/login/", {
    ...prams,
    body: JSON.stringify(prams.body),
  });
  return resp;
};
